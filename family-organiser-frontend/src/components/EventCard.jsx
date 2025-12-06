export default function EventCard({ event }) {
  // Build the Google Maps search URL
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location
  )}`;

  return (
    <div className="event-card">
      <h3>{event.event}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Time:</strong> {event.startTime} – {event.endTime}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Required Items:</strong>{" "}
        {Array.isArray(event.requiredItems)
          ? event.requiredItems.join(", ")
          : event.requiredItems}
      </p>

      <p>
        <strong>Organiser:</strong> {event.organiser}
      </p>

      {/* View on Map Button */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "10px",
          display: "inline-block",
          padding: "6px 12px",
          backgroundColor: "#0d6efd",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        📍 View on Map
      </a>
    </div>
  );
}
