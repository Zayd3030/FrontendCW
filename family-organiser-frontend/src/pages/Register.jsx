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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---- Password validation ----
    const errors = [];
    if (formData.password.length < 6) {
      errors.push("be at least 6 characters long");
    }
    if (!/\d/.test(formData.password)) {
      errors.push("contain at least one number");
    }

    if (errors.length > 0) {
      setMessage("Password must " + errors.join(" and ") + ".");
      return;
    }

    try {
      setMessage("Registering user...");

      const res = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Register response status:", res.status);

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      // If we get here, registration worked
      setMessage(
        `User "${formData.username}" registered successfully! You can now log in.`
      );

      setFormData({
        username: "",
        password: "",
        familyId: "family_1",
      });
    } catch (err) {
      console.error("Register error:", err);
      setMessage("Could not register user. Try a different username.");
    }
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

        <br />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "4px" }}>
          Password must be at least 6 characters and include a number.
        </div>

        <br />

        <label>Family ID</label>
        <input
          name="familyId"
          value={formData.familyId}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Register</button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
}
