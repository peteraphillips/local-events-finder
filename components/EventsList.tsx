"use client";
type Event = {
  id: string;
  name: string;
  venue: string;
  dates: { start: { localDate: string } };
  images?: { url: string }[];
  url: string;
};

type Props = {
  events: Event[];
};

export default function EventsList({ events }: Props) {
  if (events.length === 0) {
    return <p className="text-gray-700 text-center">No events found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <a
          key={event.id}
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                     shadow rounded-lg overflow-hidden hover:shadow-lg transition"
        >
          {event.images && (
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
  );
}
