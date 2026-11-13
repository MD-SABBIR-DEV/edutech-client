/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import { getStoredJoinedEvents } from "@/lib/axios";
import {
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

export default function JoinedEventsPage() {
  const router = useRouter();
  const { user, authLoading } = useApp();
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const timer = setTimeout(() => {
        const allJoined = getStoredJoinedEvents();
        // ইউজারের জয়েন করা ইভেন্টগুলো তারিখ অনুযায়ী সাজানো (Sorted by eventDate)
        const userJoined = allJoined
          .filter(
            (item) =>
              item.userEmail?.toLowerCase() === user.email?.toLowerCase(),
          )
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        setJoinedEvents(userJoined);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading your joined events...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
          Volunteer Schedule
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          My Joined Events
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          All social development events you have joined, sorted chronologically
          by event date.
        </p>
      </div>

      {joinedEvents.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#0d131f]/80 p-8 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00f2fe]">
            <FiCheckCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            You have not joined any events yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Explore upcoming initiatives and join a community drive to see it
            listed here.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 mt-2"
          >
            <span>Browse Upcoming Events</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {joinedEvents.map((ev) => (
            <div
              key={ev._id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-cyan-500/25 bg-white dark:bg-[#0d131f]/90 overflow-hidden shadow-lg"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={ev.thumbnail}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/85 text-[#00f2fe] border border-cyan-500/40">
                    {ev.eventType}
                  </span>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    Joined
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                    {ev.title}
                  </h3>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-[#00f2fe]" />
                      <span>{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-[#4facfe]" />
                      <span>Event Date: {ev.eventDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/events/${ev.eventId}`}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 flex items-center justify-center gap-2 transition-all"
                >
                  <span>View Event Details</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
