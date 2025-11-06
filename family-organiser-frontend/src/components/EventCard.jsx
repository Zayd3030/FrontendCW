export default function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{event.event}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Required Items:</strong> {event.requiredItems}</p>
      <p><strong>Organiser:</strong> {event.organiser}</p>
    </div>
  );
}
