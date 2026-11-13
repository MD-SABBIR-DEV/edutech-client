/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import { getStoredEvents, saveStoredEvents } from "@/lib/axios";
import Swal from "sweetalert2";
import {
  FiEdit3,
  FiTrash2,
  FiPlusCircle,
  FiCalendar,
  FiMapPin,
  FiLayers,
} from "react-icons/fi";

export default function ManageEventsPage() {
  const router = useRouter();
  const { user, authLoading } = useApp();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const timer = setTimeout(() => {
        const allEvents = getStoredEvents();
        const filtered = allEvents.filter(
          (ev) => ev.creatorEmail?.toLowerCase() === user.email?.toLowerCase(),
        );
        setMyEvents(filtered);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [user, authLoading, router]);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Delete this event?",
      text: `Are you sure you want to remove "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, Delete",
      background: "#0d131f",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        const allEvents = getStoredEvents();
        const updatedAll = allEvents.filter(
          (ev) => String(ev._id) !== String(id),
        );
        saveStoredEvents(updatedAll);
        setMyEvents((prev) =>
          prev.filter((ev) => String(ev._id) !== String(id)),
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your event has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#00f2fe",
          background: "#0d131f",
          color: "#ffffff",
        });
      }
    });
  };

  if (authLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        Verifying your session...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-[#00f2fe]">
            Organizer Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Manage My Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update details or remove social development initiatives created by{" "}
            {user.email}
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 transition-all shrink-0"
        >
          <FiPlusCircle className="w-4 h-4" />
          <span>Create New Event</span>
        </Link>
      </div>

      {myEvents.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-[#0d131f]/80 p-8 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00f2fe]">
            <FiLayers className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            You have not created any events yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Start a social service event or educational workshop in your
            community today.
          </p>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 mt-2"
          >
            <FiPlusCircle className="w-4 h-4" />
            <span>Create Your First Event</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {myEvents.map((ev) => (
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
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {ev.description}
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-[#00f2fe]" />
                      <span>{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-[#4facfe]" />
                      <span>{ev.eventDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <Link
                  href={`/edit-event/${ev._id}`}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-[#00f2fe] border border-cyan-500/30 hover:bg-cyan-500/25 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Update</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(ev._id, ev.title)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
