import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="login-page container row"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#F9F6F7",
        display: "flex",
      }}
    >
      <div
        className="col-7"
        style={{
          padding: "40px 0 0 40px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          color: "#1f2937",
        }}
      >
        <h1
          className="landing-page-title col-12"
          style={{
            padding: "0px 0px 0px 40px",
            fontWeight: "800",
            letterSpacing: "0.2px",
          }}
        >
          <span
            className="landing-page-subtitle"
            style={{
              display: "inline-block",
              padding: "6px 12px",
              fontSize: "0.9rem",
              color: "#065f46",
              background: "#d1fae5",
              borderRadius: "9999px",
              border: "1px solid rgb(221, 221, 221)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "12px",
            }}
          >
            New way to plan together
          </span>
          <br />
          Welcome to
          <br />
          <span
            className="planify-title"
            style={{
              fontFamily: "Fjalla One",
              fontStyle: "oblique",
              fontWeight: "bold",
              fontSize: "3.25rem",
              background: "linear-gradient(90deg, #10b981, #34d399)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Planify
          </span>
        </h1>
        <div
          className="landing-page-text col-12"
          style={{
            padding: "8px 40px 0px 40px",
            marginBottom: "120px",
            textAlign: "left",
            fontFamily: "Arial",
            fontSize: "1.05rem",
            color: "#374151",
            maxWidth: "720px",
          }}
        >
          <p style={{ marginTop: "8px", marginBottom: "12px" }}>
            Going out with friends just got easier—and more fun. Skip the
            endless group chats. Create a plan, pick a time and place, and bring
            everyone together in seconds.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              lineHeight: 1.9,
            }}
          >
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span role="img" aria-label="check">
                ✅
              </span>
              Quick invites
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span role="img" aria-label="check">
                ✅
              </span>
              Poll times and activities
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span role="img" aria-label="check">
                ✅
              </span>
              Smart reminders so no one forgets
            </li>
          </ul>         
        </div>        
      </div>

      <div className="col-5"
      style={{
        padding: "0 50px 0 0",
      }}>
        <LoginForm />
      </div>
    </div>
  );
}
