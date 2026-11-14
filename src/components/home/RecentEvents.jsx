"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { getEvents } from "@/lib/axios";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";

export default function RecentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getEvents(6)
      .then((upcomingEvents) => {
        if (active) setEvents(upcomingEvents);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.error ||
              "The events service is unavailable. Start the API server, then try again.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [retryCount]);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
            Upcoming Schedule
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Recent Upcoming Events
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Join the next wave of community service and tech empowerment events
            near you.
          </p>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 transition-all shrink-0"
        >
          <span>View All Events</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <p className="py-12 text-center text-slate-500 dark:text-slate-400">
          Loading upcoming events...
        </p>
      ) : error ? (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 py-10 text-center"
        >
          <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-500/20 dark:text-[#00f2fe]"
          >
            <FiRefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No upcoming events yet. Be the first to organize a community
            initiative.
          </p>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] px-5 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
          >
            Create an Event
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
