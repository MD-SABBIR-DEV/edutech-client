import axios from "axios";
import { initialEventsData } from "@/components/home/RecentEvents";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// JWT Token ইন্টারসেপ্টর (প্রোটেক্টেড রাউটের জন্য)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("edutech-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const EVENTS_KEY = "edutech_events_db";
const JOINED_KEY = "edutech_joined_db";

export function getStoredEvents() {
  if (typeof window === "undefined") return initialEventsData;
  const saved = localStorage.getItem(EVENTS_KEY);
  if (!saved) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(initialEventsData));
    return initialEventsData;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return initialEventsData;
  }
}

export function saveStoredEvents(events) {
  if (typeof window !== "undefined") {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }
}

export function getStoredJoinedEvents() {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(JOINED_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveStoredJoinedEvents(joinedList) {
  if (typeof window !== "undefined") {
    localStorage.setItem(JOINED_KEY, JSON.stringify(joinedList));
  }
}
