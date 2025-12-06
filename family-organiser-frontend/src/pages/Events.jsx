import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Delete event
  const handleDelete = (id) => {
    if (!currentUser) {
      alert("You must be logged in to delete events.");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:3002/delete-event/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: currentUser.username,
        userfamily: currentUser.userfamily,
      }),
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

  // Load events for user family
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      setError("You must be logged in to view family events.");
      setLoading(false);
      return;
    }

    const user = JSON.parse(stored);
    setCurrentUser(user);

    fetch("http://localhost:3002/get-family-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ familyId: user.userfamily }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch family events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(
          "Could not load events. Check if the backend is running and you are logged in."
        );
        setLoading(false);
      });
  }, []);

  // Filter events
  const filteredEvents = events.filter((ev) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      (ev.event && ev.event.toLowerCase().includes(term)) ||
      (ev.location && ev.location.toLowerCase().includes(term)) ||
      (ev.organiser && ev.organiser.toLowerCase().includes(term)) ||
      (ev.date && ev.date.toLowerCase().includes(term))
    );
  });

  if (loading) return <p>Loading events...</p>;

  if (error)
    return (
      <div className="page" style={{ textAlign: "left" }}>
        <p className="message error">{error}</p>
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Go to Login
        </button>
      </div>
    );


  return (
    <div className="page">
      <h1>Family Events</h1>
      <p>You have {filteredEvents.length} upcoming events</p>

      {currentUser && (
        <p>
          Viewing events for family:{" "}
          <strong>{currentUser.userfamily}</strong>
        </p>
      )}

      {/* Search bar */}
      <div className="search-bar">
        <label>Search events:</label>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Event List */}
      {filteredEvents.length === 0 ? (
        <p>No events match your search.</p>
      ) : (
        <div className="event-list">
          {filteredEvents.map((ev) => (
            <div key={ev._id}>
              <EventCard event={ev} />

              {currentUser && ev.organiser === currentUser.username && (
                <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                  <button onClick={() => navigate(`/edit-event/${ev._id}`)}>
                    Edit
                  </button>

                  <button
                    className="secondary"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDelete(ev._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
