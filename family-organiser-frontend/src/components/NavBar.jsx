import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/events" style={{ marginRight: "10px" }}>Events</Link>
      <Link to="/add-event">Add Event</Link>
    </nav>
  );
}
