
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_HERE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_UNSPLASH_API_KEY: z.string().min(1),
    NEXT_PUBLIC_HUGGING_FACE_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HERE_API_KEY: process.env.NEXT_PUBLIC_HERE_API_KEY,
    NEXT_PUBLIC_UNSPLASH_API_KEY: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
    NEXT_PUBLIC_HUGGING_FACE_API_KEY: process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY
  },
  emptyStringAsUndefined: true,
});
