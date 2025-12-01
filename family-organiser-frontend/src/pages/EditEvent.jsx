import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    event: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    requiredItems: "",
    organiser: "Admin1",
    familyId: "family_1",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load existing event
  useEffect(() => {
    fetch(`http://localhost:3002/event/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load event");
        return res.json();
      })
      .then((data) => {
        setFormData({
          event: data.event || "",
          date: data.date || "",
          startTime: data.startTime || "",
          endTime: data.endTime || "",
          location: data.location || "",
          requiredItems:
            Array.isArray(data.requiredItems)
              ? data.requiredItems.join(", ")
              : data.requiredItems || "",
          organiser: data.organiser || "Admin1",
          familyId: data.familyId || "family_1",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading event:", err);
        setMessage("Could not load event details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Updating event...");

    fetch(`http://localhost:3002/update-event/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        requiredItems: formData.requiredItems
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i !== ""),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update event");
        return res.json();
      })
      .then(() => {
        setMessage("Event updated successfully!");
        setTimeout(() => navigate("/events"), 800);
      })
      .catch((err) => {
        console.error("Error updating event:", err);
        setMessage("Could not update event.");
      });
  };

  if (loading) return <p style={{ padding: 20 }}>Loading event...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Event</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "500px", margin: "20px auto" }}
      >
        <label>Event Name</label>
        <input
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <label>End Time</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Required Items (comma separated)</label>
        <input
          name="requiredItems"
          value={formData.requiredItems}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: "10px" }}>
          Save Changes
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
}
