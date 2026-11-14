"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiGithub,
  FiArrowRight,
  FiCpu,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success(`Welcome back, ${data?.user?.name || email.trim()}!`);
      router.push("/events");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication Error!",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signIn.social({
        provider: provider.toLowerCase(), // 'google' বা 'github'
        callbackURL: "/events",
      });

      if (result?.error) {
        toast.error(
          `${provider} Login Failed! Did you set the Client ID in .env?`,
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication Error!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#00f2fe]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#4facfe]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#00f2fe] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <FiCpu className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to create and join social development initiatives
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 cursor-pointer"
              >
                {showPass ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-xl font-semibold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>{loading ? "Signing in..." : "Login to Account"}</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-400 uppercase font-medium">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-[#00f2fe] text-slate-800 dark:text-slate-200 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("GitHub")}
            className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-[#00f2fe] text-slate-800 dark:text-slate-200 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FiGithub className="w-5 h-5" />
            <span>GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-7">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-cyan-600 dark:text-[#00f2fe] hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
