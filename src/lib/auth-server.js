import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getTokenFromServer() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token ?? null;
}
