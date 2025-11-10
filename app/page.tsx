'use client';

import { useState } from "react";

export default function Home() {

  const [query, setQuery] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.NEXT_PUBLIC_TICKETMASTER_KEY}&keyword=${query}&countryCode=GB`
    );

    const data = await res.json();

    setEvents(data._embedded?.events || []);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Local Events Finder
      </h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <a
              href={`/event/${event.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {event.name}
            </a>
            <p>{event.dates.start.localDate}</p>
            <p>{event._embedded?.venues?.[0]?.name}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}


