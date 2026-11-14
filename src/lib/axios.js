import axios from "axios";
import { getTokenFromClient } from "@/lib/auth-client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  const url = config.url || "";
  const requiresAuth =
    url === "/events/mine" ||
    url.startsWith("/joined-events") ||
    (method !== "get" && url.startsWith("/events"));

  if (requiresAuth && typeof window !== "undefined") {
    const token = await getTokenFromClient();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function getEvents(limit) {
  const { data } = await apiClient.get("/events", {
    params: limit ? { limit } : undefined,
  });
  return data;
}

export async function getOwnedEvents() {
  const { data } = await apiClient.get("/events/mine");
  return data;
}

export async function getEvent(id) {
  const { data } = await apiClient.get(`/events/${id}`);
  return data;
}

export async function createEvent(event) {
  const { data } = await apiClient.post("/events", event);
  return data;
}

export async function updateEvent(id, event) {
  const { data } = await apiClient.put(`/events/${id}`, event);
  return data;
}

export async function deleteEvent(id) {
  const { data } = await apiClient.delete(`/events/${id}`);
  return data;
}

export async function joinEvent(event) {
  const { data } = await apiClient.post("/joined-events", event);
  return data;
}

export async function getJoinedEvents() {
  const { data } = await apiClient.get("/joined-events");
  return data;
}
