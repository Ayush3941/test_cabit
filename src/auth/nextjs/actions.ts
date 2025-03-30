"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import { db } from "../../drizzle/db";
import { OAuthProvider, UserTable } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession } from "../core/session";
import { getOAuthClient } from "../core/oauth/base";
import { InferInsertModel } from "drizzle-orm";

// Type for inserting into UserTable
type InsertUser = InferInsertModel<typeof UserTable>;

export async function signIn(unsafeData: unknown): Promise<string | void> {
  const parsed = signInSchema.safeParse(unsafeData);
  if (!parsed.success) return "Unable to log you in";

  const data = parsed.data;
  const user = await db.query.UserTable.findFirst({
    columns: {
      user_password: true,
      salt: true,
      user_id: true,
      email: true,
      role: true,
    },
    where: eq(UserTable.email, data.email),
  });

  if (!user || !user.user_password || !user.salt) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.user_password,
    password: data.user_password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession(user, await cookies());
  redirect("/");
}

export async function signUp(unsafeData: unknown): Promise<string | void> {
  const parsed = signUpSchema.safeParse(unsafeData);
  if (!parsed.success) {
    console.error("Schema validation failed:", parsed.error.format());
    return "Need more than 8 letter password";
  }

  const data = parsed.data;

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.user_password, salt);

    const userData: InsertUser = {
      user_name: data.user_name,
      email: data.email,
      user_password: hashedPassword,
      salt,
      user_phone: data.user_phone,
      // Optional fields (null/defaults if needed)
      user_gender: "male", // or handle this from frontend
      role: "user",
      client_avg_rating: "0.0",
    };

    const [user] = await db
      .insert(UserTable)
      .values(userData)
      .returning({
        user_id: UserTable.user_id,
        role: UserTable.role,
      });

    if (!user) return "Unable to create account";

    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    return "Unable to create account";
  }

  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}
