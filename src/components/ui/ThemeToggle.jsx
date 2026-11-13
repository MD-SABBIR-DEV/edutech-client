"use client";

import { useApp } from "@/app/providers/Providers";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-amber-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
