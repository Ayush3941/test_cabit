import { env } from "../../../data/env/server";
import { OAuthClient } from "./base";
import { z } from "zod";

const googleUserSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
});

/**
 * @returns {OAuthClient}
 */
export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/v2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    userInfo: {
      schema: googleUserSchema,
      parser: (user) => ({
        id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
      }),
    },
  });
}
