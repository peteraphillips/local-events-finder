"use client";

import { useState, useEffect, useRef } from "react";
import EventsList from "@/components/EventsList";
import clsx from "clsx";

type Event = {
  id: string;
  name: string;
  venue: string;
  dates: { start: { localDate: string } };
  images?: { url: string }[];
  url: string;
};

export default function TicketSearch() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setEvents([]);
      setError("");
      return;
    }

    // Clear previous debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      fetchEvents(query);
    }, 500); // 500ms debounce
  }, [query]);

  async function fetchEvents(keyword: string) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/events?keyword=${encodeURIComponent(keyword)}`
      );

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data: Event[] = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setEvents([]);
        setError("No events found");
      } else {
        setEvents(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg h-64 w-full"></div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-6 px-2">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for events..."
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

      {/* Events grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : events.map((event) => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {event.images && event.images[0] && (
                  <img
                    src={event.images[0].url}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2">{event.name}</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.venue || "Unknown Location"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.dates.start.localDate}
                  </p>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
}
