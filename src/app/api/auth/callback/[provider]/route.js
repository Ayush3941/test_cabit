import { getOAuthClient } from "../../../../../auth/core/oauth/base";
import { createUserSession } from "../../../../../auth/core/session";
import { db } from "../../../../../drizzle/db";
import {
  oAuthProviders,
  UserOAuthAccountTable,
  UserTable,
} from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const pathnameParts = url.pathname.split("/");
  const providerRaw = pathnameParts[pathnameParts.length - 2]; // /callback/[provider]/route
  const provider = z.enum(oAuthProviders).parse(providerRaw);

  if (!code || !state) {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed-to-connect.-Please-try-again."
      )}`
    );
  }

  const oAuthClient = getOAuthClient(provider);
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
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

async function connectUserToAccount(oAuthUser, provider) {
  const { id, email, name } = oAuthUser;

  return await db.transaction(async (trx) => {
    const userResult = await trx
      .select({
        user_id: UserTable.user_id,
        role: UserTable.role,
      })
      .from(UserTable)
      .where(eq(UserTable.email, email))
      .limit(1);

    const user = userResult[0];

    if (!user) {
      const insertedUsers = await trx
        .insert(UserTable)
        .values({
          email,
          user_name: name,
          role: "user",
        })
        .returning({
          user_id: UserTable.user_id,
          role: UserTable.role,
        });

      const newUser = insertedUsers[0];

      if (!newUser) {
        throw new Error("Failed to create new user during OAuth connection.");
      }

      await trx
        .insert(UserOAuthAccountTable)
        .values({
          user_id: newUser.user_id,
          provider,
          providerAccountId: id,
        })
        .onConflictDoNothing();

      return {
        user_id: newUser.user_id,
        role: newUser.role || "user",
      };
    }

    await trx
      .insert(UserOAuthAccountTable)
      .values({
        user_id: user.user_id,
        provider,
        providerAccountId: id,
      })
      .onConflictDoNothing();

    return {
      user_id: user.user_id,
      role: user.role || "user",
    };
  });
}

export const config = {
  runtime: "nodejs",
};
