import { getOAuthClient } from "../../../../../auth/core/oauth/base";
import { createUserSession } from "../../../../../auth/core/session";
import { db } from "../../../../../drizzle/db";
import {
  OAuthProvider,
  oAuthProviders,
  UserOAuthAccountTable,
  UserTable,
} from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { z } from "zod";

// Define OAuth user interface
interface OAuthUser {
  id: string;
  email: string;
  name: string;
}

// OAuth params type
interface OAuthParams {
  provider: string;
}

// OAuth user role type
type UserRole = "user" | "driver" | "admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const provider = z.enum(oAuthProviders).parse(rawProvider);

  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed-to-connect.-Please-try-again."
      )}`
    );
  }

  const oAuthClient = getOAuthClient(provider);
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    console.log("OAuth User Info:", oAuthUser);
    const user = await connectUserToAccount(oAuthUser, provider);
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    );
  }

  redirect("/");
}

async function connectUserToAccount(
  { id, email, name }: OAuthUser,
  provider: OAuthProvider
): Promise<{ user_id: string; role: UserRole }> {
  return await db.transaction(async trx => {
    let user = await trx.query.UserTable.findFirst({
      where: eq(UserTable.email, email),
      columns: { user_id: true, role: true },
    });

    if (!user) {
      const [newUser] = await trx
      .insert(UserTable)
      .values({
        email,
        user_name: name,
        role: "user", // Provide default role here
      })
      .returning({ user_id: UserTable.user_id, role: UserTable.role });


      if (!newUser) {
        throw new Error("Failed to create new user during OAuth connection.");
      }
      user = newUser;
    }

    await trx
      .insert(UserOAuthAccountTable)
      .values({
        user_id: user.user_id,
        provider,
        providerAccountId: id,
      })
      .onConflictDoNothing();

    // Ensure role is valid and non-null before returning
    const userRole: UserRole = user.role ?? "user"; // default to 'user' if role is null
    return { user_id: user.user_id, role: userRole };
  });
}

export const config = {
  runtime: "nodejs",
};
