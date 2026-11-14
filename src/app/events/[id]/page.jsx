"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/app/providers/Providers";
import {
  getEvent,
  getJoinedEvents,
  joinEvent,
} from "@/lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiCalendar,
  FiMapPin,
  FiTag,
  FiUser,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useApp();

  const [event, setEvent] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    let active = true;
    setEvent(null);
    setAlreadyJoined(false);
    setLoading(true);

    getEvent(id)
      .then((found) => {
        if (!active) return;
        setEvent(found);

        if (user) {
          getJoinedEvents()
            .then((joinedEvents) => {
              if (active) {
                setAlreadyJoined(
                  joinedEvents.some(
                    (joined) => String(joined.eventId) === String(found._id),
                  ),
                );
              }
            })
            .catch((error) => {
              if (active) {
                toast.error(
                  error.response?.data?.error ||
                    "Unable to check your event registration.",
                );
              }
            });
        }
      })
      .catch((error) => {
        if (active) {
          toast.error(error.response?.data?.error || "Unable to load this event.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, user]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please login first to join this event!");
      router.push("/login");
      return;
    }

    if (alreadyJoined) {
      toast("You have already joined this event!", { icon: "ℹ️" });
      return;
    }

    setJoining(true);
    try {
      await joinEvent({
        eventId: event._id,
      });
      setAlreadyJoined(true);

      await Swal.fire({
        title: "Successfully Joined!",
        text: `You are now registered as a volunteer for "${event.title}".`,
        icon: "success",
        confirmButtonColor: "#00f2fe",
        background: "#0d131f",
        color: "#ffffff",
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to join this event.");
    } finally {
      setJoining(false);
    }
  };

  if (loading || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {loading ? "Loading event details..." : "Event not found"}
        </h2>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-slate-950 font-semibold text-sm"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-[#00f2fe] hover:underline mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Upcoming Events
      </Link>

      <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 overflow-hidden shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full bg-slate-900">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-950/90 text-[#00f2fe] border border-cyan-500/40">
              <FiTag className="w-3.5 h-3.5" />
              {event.eventType}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {event.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <FiCalendar className="w-5 h-5 text-[#00f2fe] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400">Event Date</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-[#4facfe] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-400">Organizer Email</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {event.creatorEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {user
                ? `Logged in as ${user.email}`
                : "Note: You can view this page publicly, but must log in to join the event."}
            </p>

            <button
              type="button"
              onClick={handleJoinEvent}
              disabled={alreadyJoined || joining}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                alreadyJoined
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-slate-950 hover:opacity-95 shadow-lg shadow-cyan-500/20"
              }`}
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>
                {alreadyJoined
                  ? "Already Joined Event"
                  : joining
                    ? "Joining..."
                    : "Join Event"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
