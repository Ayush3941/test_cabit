import { roleEnum, SessionTable } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "crypto";
import { db } from "../../drizzle/db";

// 1 day in seconds
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  user_id: z.string(),
  role: z.enum(roleEnum.enumValues),
});

export async function getUserFromSession(cookies) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  return await getUserSessionById(sessionId);
}

export async function updateUserSessionData(user, cookies) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  console.log("Updating session for user:", user);

  await db.update(SessionTable)
    .set({
      role: user.role ?? 'user',
    })
    .where(eq(SessionTable.id, sessionId));
}

export async function createUserSession(user, cookies) {
  const sessionId = randomUUID();
  const userRole = user.role ?? "user";

  await db.insert(SessionTable).values({
    id: sessionId,
    userId: user.user_id,
    role: userRole,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
  });

  setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(cookies) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  const user = await getUserSessionById(sessionId);
  if (!user) return;

  await db.update(SessionTable)
    .set({ expiresAt: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000) })
    .where(eq(SessionTable.id, sessionId));

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(cookies) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  await db.delete(SessionTable).where(eq(SessionTable.id, sessionId));
  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId, cookies) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    // httpOnly: true, // enable this before prod
    sameSite: "lax",
    expires: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
  });
}

async function getUserSessionById(sessionId) {
  const session = await db.select().from(SessionTable).where(eq(SessionTable.id, sessionId));
  if (session.length === 0) return null;

  console.log(session);

  const { success, data: user } = sessionSchema.safeParse(session[0]);
  return success ? user : null;
}
