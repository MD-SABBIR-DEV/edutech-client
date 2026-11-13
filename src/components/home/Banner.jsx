/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FiArrowRight, FiPlusCircle } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-200 dark:border-cyan-500/15">
      {/* Background Neon Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00f2fe]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#4facfe]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-[#00f2fe] text-xs font-semibold tracking-wide uppercase">
              <span>Community-Driven Social & Tech Action</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Build Local Impact Through{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-[#00f2fe] dark:via-cyan-200 dark:to-[#4facfe] bg-clip-text text-transparent">
                Education & Service
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Join hands with students, developers, and volunteers across
              Bangladesh. Organize free ICT literacy camps, laptop & book
              donations, e-waste cleanups, and green plantation drives in your
              neighborhood.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/events"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all"
              >
                <span>Explore Upcoming Events</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-white border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center gap-2 transition-all"
              >
                <FiPlusCircle className="w-4 h-4 text-cyan-600 dark:text-[#00f2fe]" />
                <span>Create Social Event</span>
              </Link>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 max-w-lg">
              <div>
                <p className="text-2xl font-extrabold text-cyan-600 dark:text-[#00f2fe]">
                  45+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Active Drives
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-blue-600 dark:text-[#4facfe]">
                  3,200+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student Volunteers
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-indigo-600 dark:text-cyan-300">
                  18
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Districts Reached
                </p>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/80 p-4 shadow-2xl backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80"
                alt="Youth Tech and Social Workshop"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="mt-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-cyan-600 dark:text-[#00f2fe] uppercase">
                    Featured Initiative
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    Youth Digital Literacy & Winter Aid - Dhaka
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
