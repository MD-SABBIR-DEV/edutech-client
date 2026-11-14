"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { getEvents } from "@/lib/axios";
import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";

const EVENT_TYPES = [
  "All",
  "Education",
  "Donation",
  "Plantation",
  "Cleanup",
  "Workshop",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getEvents()
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

  const filteredEvents = events.filter((ev) => {
    const matchesType = selectedType === "All" || ev.eventType === selectedType;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
          Discover & Participate
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Upcoming Social Events
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Browse active community service drives, skill workshops, and
          environmental campaigns across Bangladesh.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#0d131f]/80">
        <div className="relative w-full md:w-96">
          <FiSearch className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or location (e.g., Dhaka)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00f2fe]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <FiFilter className="w-3.5 h-3.5 text-[#00f2fe]" />
            Filter:
          </span>
          {EVENT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedType === type
                  ? "bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-slate-950 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-cyan-500/40 border border-transparent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 dark:text-slate-400">
          Loading upcoming events...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 rounded-3xl border border-rose-500/20 bg-white/50 py-20 text-center dark:bg-[#0d131f]/40"
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
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white/50 px-6 py-16 text-center dark:border-slate-800 dark:bg-[#0d131f]/40">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            No upcoming events yet
          </h2>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            Be the first to organize a community initiative. Your event will
            appear here as soon as it is published.
          </p>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] px-5 py-3 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
          >
            Create an Event
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0d131f]/40">
          <p className="text-lg font-bold text-slate-800 dark:text-white">
            No matching upcoming events found
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Try clearing your search filter or create a new social initiative!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
