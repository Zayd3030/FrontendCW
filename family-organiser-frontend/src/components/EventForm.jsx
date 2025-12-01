import { useState } from "react";

export default function EventForm({ onEventAdded }) {
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

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setMessage("Submitting...");

  fetch("http://localhost:3002/new-event-entry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: formData.event,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      requiredItems: formData.requiredItems.split(",").map((i) => i.trim()),
      username: "Admin1",
      userfamily: "family_1",
      userrole: "administrator",
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to add event");
      return res.json();
    })
    .then(() => {
      setMessage("Event added successfully!");
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
      console.error("Error:", err);
      setMessage("Could not add event.");
    });
};


  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Add New Event</h2>
      <label>Event Name</label>
      <input name="event" value={formData.event} onChange={handleChange} required />

      <label>Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <label>Start Time</label>
      <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />

      <label>End Time</label>
      <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} required />

      <label>Required Items</label>
      <input name="requiredItems" value={formData.requiredItems} onChange={handleChange} />

      <button type="submit" style={{ marginTop: "10px" }}>Add Event</button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </form>
  );
}
