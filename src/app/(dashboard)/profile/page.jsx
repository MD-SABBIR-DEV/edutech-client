"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import { authClient } from "@/lib/auth-client"; // BetterAuth ইমপোর্ট করা হলো
import toast from "react-hot-toast";
import { FiUser, FiImage, FiMail, FiSave } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { user, authLoading } = useApp();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      const timer = setTimeout(() => {
        setName(user.name || "");
        // BetterAuth ডিফল্টভাবে প্রোফাইল ছবিকে user.image হিসেবে রাখে
        setPhotoURL(user.image || user.photoURL || "");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, authLoading, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim() || !photoURL.trim()) {
      toast.error("Name and Photo URL cannot be empty!");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: photoURL.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile!");
        return;
      }

      toast.success("Profile updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || !user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 p-8 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 mb-8 border-b border-slate-200 dark:border-slate-800">
          <img
            src={
              photoURL ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
            }
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-[#00f2fe] shadow-lg"
          />
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
              Volunteer Profile
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {user.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Email Address (Read Only)
            </label>
            <div className="relative">
              <FiMail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Display Name
            </label>
            <div className="relative">
              <FiUser className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Profile Photo URL
            </label>
            <div className="relative">
              <FiImage className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
          >
            <FiSave className="w-4 h-4" />
            <span>{updating ? "Updating..." : "Update Profile"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
