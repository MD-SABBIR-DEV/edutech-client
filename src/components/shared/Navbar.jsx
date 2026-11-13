/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import ThemeToggle from "@/components/ui/ThemeToggle";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import {
  FiCalendar,
  FiPlusCircle,
  FiLayers,
  FiCheckCircle,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiCpu,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logoutUser } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    logoutUser();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success("Logged out successfully!");
    window.location.href = "/login"; // পেজ রিফ্রেশ করে লগইন পেজে পাঠিয়ে দেবে
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-200 dark:border-cyan-500/20 bg-white/85 dark:bg-[#07090e]/85 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00f2fe] to-[#4facfe] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <FiCpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-[#00f2fe] dark:via-cyan-200 dark:to-[#4facfe] bg-clip-text text-transparent">
              EduTech Impact
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
              Social & Tech Community Hub
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "text-cyan-600 dark:text-[#00f2fe]"
                : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              pathname.startsWith("/events")
                ? "text-cyan-600 dark:text-[#00f2fe]"
                : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#00f2fe]"
            }`}
          >
            <FiCalendar className="w-4 h-4" />
            Upcoming Events
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {!user ? (
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3" ref={dropdownRef}>
              {/* Profile Picture + Hover Display Name + Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative flex items-center rounded-full p-0.5 border-2 border-[#00f2fe] focus:outline-none cursor-pointer"
                >
                  <img
                    src={
                      user?.image ||
                      user?.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    }
                    alt={user?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {/* Hover Display Name Tooltip */}
                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-xs font-medium text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                  {user.name}
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-[#0d131f] border border-slate-200 dark:border-cyan-500/30 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/create-event"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                    >
                      <FiPlusCircle className="w-4 h-4 text-cyan-500 dark:text-[#00f2fe]" />
                      Create Event
                    </Link>

                    <Link
                      href="/manage-events"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                    >
                      <FiLayers className="w-4 h-4 text-cyan-500 dark:text-[#00f2fe]" />
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors"
                    >
                      <FiCheckCircle className="w-4 h-4 text-cyan-500 dark:text-[#00f2fe]" />
                      Joined Events
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-[#00f2fe] transition-colors border-t border-slate-200 dark:border-slate-800/80 mt-1"
                    >
                      <FiUser className="w-4 h-4 text-blue-500 dark:text-[#4facfe]" />
                      Profile Settings
                    </Link>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0b101b] border-b border-slate-200 dark:border-cyan-500/20 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Upcoming Events
          </Link>

          {user ? (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-3 pb-2">
                <img
                  src={
                    user?.image ||
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  }
                  alt={user?.name || "User"}
                  className="w-9 h-9 rounded-full object-cover border border-[#00f2fe]"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-cyan-600 dark:text-cyan-300 font-medium"
              >
                + Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Joined Events
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full mt-2 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-600 dark:text-rose-300 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe]"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
