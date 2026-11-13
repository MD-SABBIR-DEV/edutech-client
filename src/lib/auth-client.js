import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// এগুলো দিয়ে আমরা রিয়েল লগইন, সাইনআপ এবং সেশন চেক করব
export const { signIn, signUp, signOut, useSession } = authClient;