import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 NEW

  const navigate = useNavigate();

  // Delete event
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3002/delete-event/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete event");
        return res.json();
      })
      .then(() => {
        setEvents((prev) => prev.filter((ev) => ev._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        alert("Could not delete event.");
      });
  };

  // Fetch events
  useEffect(() => {
    fetch("http://localhost:3002/all-events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Could not load events. Check if the backend is running.");
        setLoading(false);
      });
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter((ev) => {
    if (!searchTerm.trim()) return true; // no filter if box empty

    const term = searchTerm.toLowerCase();
    return (
      (ev.event && ev.event.toLowerCase().includes(term)) ||
      (ev.location && ev.location.toLowerCase().includes(term)) ||
      (ev.organiser && ev.organiser.toLowerCase().includes(term)) ||
      (ev.date && ev.date.toLowerCase().includes(term))
    );
  });

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Family Events</h1>

      {/* Search box */}
      <div style={{ margin: "15px 0" }}>
        <label style={{ marginRight: "8px" }}>
          Search by name, location, organiser, or date:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          style={{ padding: "6px", minWidth: "280px" }}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p>No events match your search.</p>
      ) : (
        filteredEvents.map((ev) => (
          <div key={ev._id} style={{ marginBottom: "15px" }}>
            <EventCard event={ev} />
            <button
              onClick={() => navigate(`/edit-event/${ev._id}`)}
              style={{
                marginTop: "8px",
                marginRight: "8px",
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(ev._id)}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
