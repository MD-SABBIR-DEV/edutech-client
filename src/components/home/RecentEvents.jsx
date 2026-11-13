"use client";

import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import { FiArrowRight } from "react-icons/fi";

export const initialEventsData = [
  {
    _id: "evt-101",
    title: "Free Web Development & AI Literacy Bootcamp for Youth",
    description:
      "Hands-on community training session introducing underprivileged college students to modern web technologies and AI career tracks.",
    eventType: "Education",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    location: "Dhanmondi 27, Dhaka",
    eventDate: "2026-12-05",
    creatorEmail: "organizer@edutechimpact.org",
  },
  {
    _id: "evt-102",
    title: "Winter Clothes & Blanket Distribution Drive",
    description:
      "Collecting and distributing warm clothes and blankets for street children and low-income families ahead of peak winter.",
    eventType: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    location: "Mirpur 10, Dhaka",
    eventDate: "2026-12-12",
    creatorEmail: "organizer@edutechimpact.org",
  },
  {
    _id: "evt-103",
    title: "Green Campus Rooftop & Urban Tree Plantation",
    description:
      "Planting 500+ native saplings and medicinal plants across college campuses to combat urban heat and pollution.",
    eventType: "Plantation",
    thumbnail:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    location: "Shantinagar, Dhaka",
    eventDate: "2026-12-18",
    creatorEmail: "organizer@edutechimpact.org",
  },
  {
    _id: "evt-104",
    title: "E-Waste & Plastic Cleanup Campaign at Dhanmondi Lake",
    description:
      "A student-led morning cleanup drive to remove plastic waste and safely collect discarded electronics for recycling.",
    eventType: "Cleanup",
    thumbnail:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
    location: "Rabindra Sarobar, Dhanmondi, Dhaka",
    eventDate: "2026-12-22",
    creatorEmail: "organizer@edutechimpact.org",
  },
  {
    _id: "evt-105",
    title: "Refurbished Laptop & Science Book Donation Camp",
    description:
      "Donating functional laptops and university-level science textbooks to meritorious students from rural backgrounds.",
    eventType: "Donation",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    location: "Mohammadpur, Dhaka",
    eventDate: "2027-01-05",
    creatorEmail: "organizer@edutechimpact.org",
  },
  {
    _id: "evt-106",
    title: "Youth Innovation & Open-Source For Social Good",
    description:
      "Collaborative seminar where young developers build open-source tools for local health, education, and market transparency.",
    eventType: "Workshop",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    location: "Mohakhali, Dhaka",
    eventDate: "2027-01-15",
    creatorEmail: "organizer@edutechimpact.org",
  },
];

export default function RecentEvents() {
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

      {/* 3 Column Grid Layout showing 6 recent upcoming events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {initialEventsData.slice(0, 6).map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
