"use client";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/api";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetcher("/events")
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="border-b py-2">
            <strong>{event.name}</strong> - {event.location} (
            {new Date(event.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
