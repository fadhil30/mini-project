import { events } from "../data/mockData";

export default function EventList() {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2 p-2 border-b">
            <h3 className="font-semibold">{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Attendees: {event.attendees}</p>
            <p>Revenue: ${event.revenue}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}