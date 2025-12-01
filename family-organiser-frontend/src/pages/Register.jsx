import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    familyId: "family_1",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Registering user...");

    fetch("http://localhost:3002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to register");
        return res.json();
      })
      .then(() => {
        setMessage("User registered successfully!");
        setFormData({
          username: "",
          password: "",
          familyId: "family_1",
        });
      })
      .catch((err) => {
        console.error("Register error:", err);
        setMessage("Could not register user.");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", marginTop: "20px" }}
      >
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Family ID</label>
        <input
          name="familyId"
          value={formData.familyId}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Register</button>

        {message && (
          <p style={{ marginTop: "10px" }}>{message}</p>
        )}
      </form>
    </div>
  );
}
