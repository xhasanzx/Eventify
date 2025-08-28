import { useState } from "react";
import API, { setTokens } from "../api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    API.post("/user/login/", data)
      .then((res) => {
        console.log(res);
        setTokens(res.data.tokens.access, res.data.tokens.refresh);

        // Trigger a custom event to notify App component
        window.dispatchEvent(new Event("loginSuccess"));

        // Force a page refresh as fallback
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
