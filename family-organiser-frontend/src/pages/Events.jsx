import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

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

  useEffect(() => {
    // Glasgow weather
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=55.86&longitude=-4.25&current_weather=true";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current_weather) {
          setWeather({
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed,
            code: data.current_weather.weathercode,
          });
        } else {
          setWeatherError("No weather data available.");
        }
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
        setWeatherError("Could not load weather.");
      });
  }, []);

    // Map Open-Meteo weather codes to a simple emoji + label
  const getWeatherIcon = (code) => {
    if (code === 0) return { emoji: "☀️", label: "Clear sky" };
    if (code === 1 || code === 2) return { emoji: "🌤️", label: "Mostly sunny" };
    if (code === 3) return { emoji: "☁️", label: "Cloudy" };
    if (code === 45 || code === 48) return { emoji: "🌫️", label: "Foggy" };
    if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "Drizzle" };
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
      return { emoji: "🌧️", label: "Rain" };
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
      return { emoji: "❄️", label: "Snow" };
    if (code >= 95) return { emoji: "⛈️", label: "Thunderstorm" };

    return { emoji: "📊", label: "Mixed conditions" };
  };


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
  <div className="container py-4">
    <h1 className="mb-1">Family Events</h1>
    <p className="text-muted">
      You have {events.length} upcoming events
    </p>

    {/* Weather widget */}
    {weather && (() => {
      const { emoji, label } = getWeatherIcon(weather.code);
      return (
        <div
          className="alert alert-info py-2 px-3 mb-4"
          style={{ maxWidth: "560px" }}
        >
          <strong>Today&apos;s Weather (Glasgow):</strong>{" "}
          <span style={{ marginRight: "6px" }}>{emoji}</span>
          {label}: {weather.temperature}°C, wind {weather.windspeed} km/h
        </div>
      );
    })()}

    {currentUser && (
      <p>
        Viewing events for family:{" "}
        <strong>{currentUser.userfamily}</strong>
      </p>
    )}

    {/* Search box */}
    <div className="mb-3">
      <label className="form-label">
        Search events:
      </label>
      <input
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
    </div>

    {filteredEvents.length === 0 ? (
      <p>No events match your search.</p>
    ) : (
      filteredEvents.map((ev) => (
        <EventCard key={ev._id} event={ev}>
          {currentUser && ev.organiser === currentUser.username && (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => navigate(`/edit-event/${ev._id}`)}
              >
                <i className="bi bi-pencil-square me-1"></i>
                Edit
              </button>

              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(ev._id)}
              >
                <i className="bi bi-trash me-1"></i>
                Delete
              </button>
            </>
          )}
        </EventCard>
      ))
    )}
  </div>

  );
}
