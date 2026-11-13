"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import { getStoredEvents } from "@/lib/axios";
import { FiSearch, FiFilter } from "react-icons/fi";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      const allEvents = getStoredEvents();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // শুধুমাত্র ভবিষ্যতের বা আজকের ইভেন্টগুলো রাখা হচ্ছে (Past date বাদ)
      const upcomingOnly = allEvents
        .filter((ev) => new Date(ev.eventDate) >= today)
        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      setEvents(upcomingOnly);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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
      {filteredEvents.length === 0 ? (
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
