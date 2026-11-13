import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// BetterAuth-এর সমস্ত API রিকোয়েস্ট (লগইন, রেজিস্টার, সেশন) এই ফাইলটি হ্যান্ডেল করবে
export const { GET, POST } = toNextJsHandler(auth);