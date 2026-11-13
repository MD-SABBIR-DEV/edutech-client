"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address!");
      return;
    }
    toast.success("Subscribed successfully to EduTech Impact alerts!");
    setEmail("");
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-[#0b1320] to-slate-900 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00f2fe]">
            Stay Connected
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get Weekly Impact & Event Alerts
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Subscribe to our newsletter to receive updates on upcoming free tech workshops, volunteer drives, and social development events in your area.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00f2fe]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Subscribe</span>
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}