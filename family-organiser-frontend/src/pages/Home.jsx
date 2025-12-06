export default function Home() {
  return (
    <div className="page" style={{ textAlign: "center" }}>
      <h1>Welcome to the Family Organiser</h1>

      <p
        style={{
          maxWidth: "700px",
          fontSize: "1.1rem",
          margin: "0 auto", 
          lineHeight: "1.6",
        }}
      >
        This application helps families stay organised by allowing members to
        create, manage and track important events such as appointments,
        activities and reminders.
        <br /><br />
        Each family has its own private space only members in the same
        <strong> Family ID </strong> can view or manage events. Administrators
        can create and manage events, while all members can view what’s happening
        in their shared family schedule.
      </p>

      {/* Features Section */}
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "40px" }}>📅</div>
          <p><strong>Create Events</strong></p>
        </div>

        <div>
          <div style={{ fontSize: "40px" }}>🔍</div>
          <p><strong>Search & Filter</strong></p>
        </div>

        <div>
          <div style={{ fontSize: "40px" }}>👨‍👩‍👧‍👦</div>
          <p><strong>Family Only Access</strong></p>
        </div>

        <div>
          <div style={{ fontSize: "40px" }}>🔐</div>
          <p><strong>Secure Login</strong></p>
        </div>
      </div>
    </div>
  );
}