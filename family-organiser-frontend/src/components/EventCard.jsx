export default function EventCard({ event, children }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">{event.event}</h4>

        <p className="card-text mb-1">
          <strong>Date:</strong> {event.date}
        </p>
        <p className="card-text mb-1">
          <strong>Time:</strong> {event.startTime} – {event.endTime}
        </p>
        <p className="card-text mb-1">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="card-text mb-1">
          <strong>Required Items:</strong>{" "}
          {Array.isArray(event.requiredItems)
            ? event.requiredItems.join(", ")
            : event.requiredItems}
        </p>
        <p className="card-text mb-2">
          <strong>Organiser:</strong> {event.organiser}
        </p>

        {/* View on Map button */}
        <button
          type="button"
          className="btn btn-sm btn-primary mb-2"
          onClick={() => {
            const query = encodeURIComponent(event.location || "");
            window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
          }}
        >
          <i className="bi bi-geo-alt-fill me-1"></i>
          View on Map
        </button>

        {children && <div className="mt-3 d-flex gap-2">{children}</div>}
      </div>
    </div>
  );
}
