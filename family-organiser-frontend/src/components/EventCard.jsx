export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.event}</h3>

      <div className="meta">
        <span>
          <strong>Date:</strong> {event.date}
        </span>
        <span>
          <strong>Time:</strong> {event.startTime} – {event.endTime}
        </span>
        <span>
          <strong>Location:</strong> {event.location}
        </span>
        <span>
          <strong>Required Items:</strong> {event.requiredItems}
        </span>
        <span>
          <strong>Organiser:</strong> {event.organiser}
        </span>
      </div>
    </div>
  );
}
