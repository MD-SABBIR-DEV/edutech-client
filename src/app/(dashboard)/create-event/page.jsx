"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/providers/Providers";
import { createEvent } from "@/lib/axios";
import { getNextEventDate } from "@/lib/event-dates";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FiPlusCircle,
  FiCalendar,
  FiMapPin,
  FiTag,
  FiImage,
  FiFileText,
} from "react-icons/fi";

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useApp();

  const [form, setForm] = useState({
    title: "",
    description: "",
    eventType: "Education",
    thumbnail: "",
    location: "",
    eventDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create an event!");
      router.push("/login");
      return;
    }

    const todayInDhaka = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
    }).format(new Date());
    if (form.eventDate <= todayInDhaka) {
      toast.error(
        "Choose a future event date. Today and past dates are not allowed.",
      );
      return;
    }

    try {
      await createEvent(form);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Unable to create the event.",
      );
      return;
    }

    Swal.fire({
      title: "Event Created Successfully!",
      text: "Your initiative has been published to Upcoming Events.",
      icon: "success",
      confirmButtonColor: "#00f2fe",
      background: "#0d131f",
      color: "#ffffff",
    });

    router.push("/events");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#0d131f]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f2fe] to-[#4facfe] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <FiPlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Create Community Event
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Organize a tech workshop, donation drive, or environmental
              campaign
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="e.g., Free Web Development Bootcamp for Youth"
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
                placeholder="https://images.unsplash.com/photo-..."
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
                placeholder="e.g., Dhanmondi 27, Dhaka"
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
                placeholder="Write detailed information about the initiative..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00f2fe]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
}
