import { useState } from "react";
import { Link } from "react-router-dom";
import API, { setTokens } from "../api";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 3) {
      setError("Password must be at least 3 characters.");
      return;
    }

    setIsLoading(true);
    API.post("/user/signup/", { username, password, email })
      .then((res) => {
        setSuccess("Account created! We're redirecting you to the home page.");
        setTokens(res.data.tokens.access, res.data.tokens.refresh);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.error || "Signup failed. Try again.";
        setError(typeof msg === "string" ? msg : "Signup failed. Try again.");
      })
      .finally(() => {
        setIsLoading(false);
        window.dispatchEvent(new Event("loginSuccess"));
        window.location.href = "/home";
      });
  };

  return (
    <div
      className="row"
      style={{
        margin: "2rem 3rem",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        className="card signup-sidebar col-6"
        style={{
          color: "var(--text-medium)",
          backgroundColor: "var(--bg-medium)",
          borderRadius: "12px",
          width: "30rem",
          margin: "1rem auto",
          boxShadow: "var(--card-shadow)",
          alignItems: "center",
          fontWeight: "500",
        }}
      >
        <h1
          style={{
            color: "var(--text-medium)",
            margin: "1rem",
            fontSize: "var(--font-size-large)",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          Welcome
          <br />
          <span
            style={{
              color: "var(--primary-medium)",
              fontSize: "var(--font-size-xlarge)",
              letterSpacing: "1.5px",
            }}
          >
            to Suhba
          </span>
        </h1>

        <p
          style={{
            margin: "1rem",
            fontSize: "var(--font-size-medium)",
            textAlign: "center",
            letterSpacing: "0.5px",
            lineHeight: "1.5",
            width: "80%",
            margin: "auto 0",
          }}
        >
          We are glad to have you here! Create your account, and start planing
          your next meet up!
        </p>
        <p
          style={{
            fontSize: "var(--font-size-small)",
            margin: "auto 0",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--primary-medium)",
              fontSize: "var(--font-size-small)",
              WebkitTextStroke: "0.1px var(--primary-light)",
            }}
          >
            Login
          </Link>
        </p>
      </div>
      <div
        className="card col-6"
        style={{
          color: "var(--text-medium)",
          backgroundColor: "var(--bg-medium)",
          borderRadius: "12px",
          width: "30rem",
          margin: "1rem auto",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="card-body" style={{ padding: "24px" }}>
          <h3
            style={{
              textAlign: "center",
              margin: "1rem",
              color: "var(--primary-medium)",
              fontSize: "var(--font-size-xlarge)",
              fontWeight: "800",
            }}
          >
            Create your account
          </h3>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success py-2" role="alert">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="col-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="col-6">
                <label className="form-label">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm your password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="col-12 pt-2">
                <button
                  type="submit"
                  className="button-primary"
                  style={{
                    width: "100%",
                    margin: "0 auto",
                    display: "block",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
