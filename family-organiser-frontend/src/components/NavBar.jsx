import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/add-event">Add Event</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>

      {user && (
        <div className="nav-user">
          Logged in as <strong>{user.username}</strong>
          <button className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
