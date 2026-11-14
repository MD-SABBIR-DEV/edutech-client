"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/app/providers/Providers";
import { getEvent, updateEvent } from "@/lib/axios";
import { getNextEventDate } from "@/lib/event-dates";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiEdit3,
  FiCalendar,
  FiMapPin,
  FiTag,
  FiImage,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, authLoading } = useApp();

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Education",
    thumbnail: "",
    location: "",
    eventDate: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    let active = true;
    getEvent(id)
      .then((found) => {
        if (!active) return;

        if (!found) {
          toast.error("Event not found!");
          router.push("/manage-events");
          return;
        }

        if (
          user &&
          found.creatorEmail?.toLowerCase() !== user.email?.toLowerCase()
        ) {
          toast.error("You can only edit your own created events!");
          router.push("/manage-events");
          return;
        }

        setForm({
          title: found.title || "",
          description: found.description || "",
          eventType: found.eventType || "Education",
          thumbnail: found.thumbnail || "",
          location: found.location || "",
          eventDate: found.eventDate || "",
        });
      })
      .catch((error) => {
        if (!active) return;
        toast.error(error.response?.data?.error || "Unable to load this event.");
        router.push("/manage-events");
      });

    return () => {
      active = false;
    };
  }, [id, user, authLoading, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.location.trim()
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const todayInDhaka = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
    }).format(new Date());
    if (form.eventDate <= todayInDhaka) {
      toast.error("Choose a future event date. Today and past dates are not allowed.");
      return;
    }

    try {
      await updateEvent(id, form);
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to update this event.");
      return;
    }

    Swal.fire({
      title: "Event Updated!",
      text: "Your event information has been updated successfully.",
      icon: "success",
      confirmButtonColor: "#00f2fe",
      background: "#0d131f",
      color: "#ffffff",
    });

    router.push("/manage-events");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <Link
        href="/manage-events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-[#00f2fe] hover:underline mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Manage Events
      </Link>

      <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-[#00f2fe] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <FiEdit3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Update Event Details
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Modify schedule, location, or description for your initiative
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Event Type
              </label>
              <div className="relative">
                <FiTag className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
                >
                  <option value="Education">Education</option>
                  <option value="Donation">Donation</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Event Date (Future Only)
              </label>
              <div className="relative">
                <FiCalendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  name="eventDate"
                  required
                  min={getNextEventDate()}
                  value={form.eventDate}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Thumbnail Image URL
            </label>
            <div className="relative">
              <FiImage className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                name="thumbnail"
                required
                pattern="https?://.+"
                value={form.thumbnail}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Location
            </label>
            <div className="relative">
              <FiMapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Description
            </label>
            <div className="relative">
              <FiFileText className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-[#00f2fe] hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            Save Updated Event
          </button>
        </form>
      </div>
    </div>
  );
}
