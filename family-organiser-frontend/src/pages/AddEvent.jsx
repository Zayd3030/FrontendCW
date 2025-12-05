import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    event: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    requiredItems: "",
  });

  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Load logged in user on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setMessage("❌ You must be logged in to add events.");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    const user = JSON.parse(stored);
    setCurrentUser(user);

    if (user.userrole !== "administrator") {
      setMessage("❌ Only administrators can create events.");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      setMessage("❌ You must be logged in to add events.");
      return;
    }

    if (currentUser.userrole !== "administrator") {
      setMessage("❌ Only administrators can create events.");
      return;
    }

    setMessage("Saving event...");

    fetch("http://localhost:3002/new-event-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: formData.event,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        requiredItems: formData.requiredItems,
        username: currentUser.username,
        userfamily: currentUser.userfamily,
        userrole: currentUser.userrole,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add event");
        return res.json();
      })
      .then(() => {
        setMessage("✅ Event added successfully!");
        setFormData({
          event: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          requiredItems: "",
        });
      })
      .catch((err) => {
        console.error("Add event error:", err);
        setMessage("❌ Could not add event. Please try again.");
      });
  };

  return (
      <div className="page">
      <h1>Add Event</h1>

      {currentUser && (
        <p>
          Creating event as <strong>{currentUser.username}</strong> (family:{" "}
          <strong>{currentUser.userfamily}</strong>, role:{" "}
          <strong>{currentUser.userrole}</strong>)
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Event Name</label>
          <input
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Items Required</label>
          <input
            name="requiredItems"
            value={formData.requiredItems}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Event</button>

        {message && (
          <p
            className={
              "message " +
              (message.startsWith("✅")
                ? "success"
                : message.startsWith("❌")
                ? "error"
                : "")
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
