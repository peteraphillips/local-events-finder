"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import EventsList from "./EventsList";

type Event = {
  id: string;
  name: string;
  venue: string;
  dates: { start: { localDate: string } };
  images?: { url: string }[];
  url: string;
};

export default function TicketSearch() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/events?keyword=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setEvents([]);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      setError("Failed to fetch events.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <EventsList events={events} />}
    </div>
  );
}
