import API from "../api";
import { useState, useEffect } from "react";
import "../style/style.css";

export default function EditAccountForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  if (error) {
    setTimeout(() => {
      setError("");
    }, 3500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !password2.trim()
    ) {
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
    console.log(username, email, password);
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      <p className="account-container-title">Account Details</p>
      <form>
        <div className="form-group row">
          <div className="col-12">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
        <div
          className="col-12"
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="button-primary" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </>
  );
}
