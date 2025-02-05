import { z } from "zod";

// Define the schema
const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
  VITE_BACKEND_BASE_URL: z.string(),
});

// Parse and validate the environment variables
const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  const errorMessages = parsedEnv.error.errors.map(
    (err) => `${err.path.join(".")}: ${err.message}`
  );
  console.error(
    "❌ Invalid environment variables:\n",
    errorMessages.join("\n")
  );
  throw new Error("Environment variables validation failed");
}

export const env = parsedEnv.data;
