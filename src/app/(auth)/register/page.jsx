"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiUser,
  FiMail,
  FiImage,
  FiLock,
  FiArrowRight,
  FiCpu,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const { loginUser } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!name.trim() || !email.trim() || !photoURL.trim() || !password) {
      toast.error("All fields are required!");
      return;
    }

    // PDF Password Validation Rules
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one Uppercase letter (A-Z)!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one Lowercase letter (a-z)!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim(),
      photoURL: photoURL.trim(),
      password,
    };

    const existingUsers = JSON.parse(
      localStorage.getItem("edutech_users") || "[]",
    );
    localStorage.setItem(
      "edutech_users",
      JSON.stringify([...existingUsers, newUser]),
    );
    localStorage.setItem("edutech-token", "jwt-token-" + Date.now());

    loginUser({
      name: newUser.name,
      email: newUser.email,
      photoURL: newUser.photoURL,
    });

    Swal.fire({
      title: "Registration Complete!",
      text: "Your EduTech Impact account has been created successfully.",
      icon: "success",
      confirmButtonColor: "#00f2fe",
      background: "#0d131f",
      color: "#ffffff",
    });

    router.push("/");
  };

  return (
    <section className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00f2fe]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#4facfe]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#00f2fe] to-[#4facfe] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <FiCpu className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Join our community of students, educators & volunteers
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="MD Sabbir"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="sabbir@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Photo URL
            </label>
            <div className="relative">
              <FiImage className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                name="photoURL"
                required
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FiLock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
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
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              Must include uppercase, lowercase, and at least 6 characters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
          >
            <span>Create Account</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-600 dark:text-[#00f2fe] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
