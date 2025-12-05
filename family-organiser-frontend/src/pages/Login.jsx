import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    familyId: "family_1", 
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        familyId: formData.familyId,  
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        const user = {
          username: data.username,
          userrole: data.userrole,
          userfamily: data.userfamily,
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(user));

        setMessage("Login successful!");
        setTimeout(() => navigate("/events"), 500);
      })
      .catch((err) => {
        console.error("Login error:", err);
        setMessage("Invalid username, password, or family.");
      });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

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
          required
        />
        <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "4px" }}>
          Use the same Family ID you registered with
        </div>

        <br />

        <button type="submit">Login</button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
}
