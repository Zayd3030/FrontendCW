import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Read the logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link>{" "}
      <Link to="/events">Events</Link>{" "}
      <Link to="/add-event">Add Event</Link>{" "}
      <Link to="/register">Register</Link>{" "}
      <Link to="/login">Login</Link>

      {user && (
        <span style={{ marginLeft: "20px" }}>
          Logged in as <strong>{user.username}</strong>{" "}
          <button
            onClick={handleLogout}
            style={{ marginLeft: "8px", padding: "3px 8px" }}
          >
            Logout
          </button>
        </span>
      )}
    </nav>
  );
}
