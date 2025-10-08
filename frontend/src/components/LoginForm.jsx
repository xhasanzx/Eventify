import { useState } from "react";
import API, { setTokens } from "../api";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setIsLoading(true);
    const data = { username, password };

    API.post("/user/login/", data)
      .then((res) => {
        setTokens(res.data.tokens.access, res.data.tokens.refresh);
        window.dispatchEvent(new Event("loginSuccess"));
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid credentials. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-form">
      <div className="card-body" style={{ padding: "24px" }}>
        <h2 className="text-center mb-3 header">
          Sign in to continue
        </h2>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <button
            type="submit"
            className="btn w-100"
            style={{
              textDecoration: "none",
              background: "#10b981",
              color: "white",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: 700,
              boxShadow: "0 8px 20px rgba(16,185,129,0.25)",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
