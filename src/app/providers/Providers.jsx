"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client"; // BetterAuth কানেকশন

const AppContext = createContext(null);

export function Providers({ children }) {
  const [theme, setTheme] = useState("dark");

  const { data: session, isPending: betterAuthLoading } = useSession();
  const user = session?.user ?? null;
  const authLoading = betterAuthLoading;

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("edutech-theme") || "dark";
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("edutech-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, user, authLoading }}
    >
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#07090e] text-slate-100"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        <Toaster position="top-right" />
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
