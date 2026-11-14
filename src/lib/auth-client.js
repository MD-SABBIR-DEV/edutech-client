import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [jwtClient()],
});

// এগুলো দিয়ে আমরা রিয়েল লগইন, সাইনআপ এবং সেশন চেক করব
export const { signIn, signUp, signOut, useSession } = authClient;

export async function getTokenFromClient() {
  const { data, error } = await authClient.token();

  if (error) {
    if (error.status === 401) return null;
    throw new Error(error.message || "Unable to retrieve an access token.");
  }

  return data?.token ?? null;
}