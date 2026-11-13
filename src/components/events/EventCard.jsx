/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { FiCalendar, FiMapPin, FiArrowRight, FiTag } from "react-icons/fi";

export default function EventCard({ event }) {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group h-full flex flex-col rounded-2xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#0d131f]/90 backdrop-blur-md overflow-hidden hover:border-cyan-500 dark:hover:border-[#00f2fe]/60 transition-all duration-300 shadow-md hover:shadow-xl">
      {/* Uniform Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/85 text-[#00f2fe] border border-cyan-500/40 backdrop-blur-md">
            <FiTag className="w-3 h-3" />
            {event.eventType}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-[#00f2fe] transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4 text-cyan-600 dark:text-[#00f2fe] shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-blue-600 dark:text-[#4facfe] shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/15"
          >
            <span>View Event</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
