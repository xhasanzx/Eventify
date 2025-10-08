import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page row">
      <div className="col-7">
        <h1 className="landing-page-title col-12">
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
          <p style={{            
            color: "hsla(0, 0%, 100%, 1.00)",
          }}>Welcome to</p>
          <span
            className="suhba-title"
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
            SUHBA
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
            color: "hsla(0, 0%, 100%, 1.00)",
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

      <div className="col-5">
        <LoginForm />
      </div>
    </div>
  );
}
