import API from "../api";
import { useState, useEffect } from "react";
import "../style/style.css";

export default function EditAccountForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  if (error) {
    setTimeout(() => {
      setError("");
    }, 3500);
  }

  if (msg) {
    setTimeout(() => {
      setMsg("");
    }, 3500);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    API.put('user/change-password/', { oldPassword, newPassword })
      .then((res) => {
        setMsg("Password changed successfully.");
        console.log(res);
        setOldPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        setError("Error changing password.");
        console.log(err);
      });
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    API.put('user/update/', { username, email })
      .then((res) => {
        setMsg("Profile updated successfully.");
        console.log(res);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        setError("Error updating profile.");
        console.log(err);
      });
  };

  const fetchData = async () => {
    try {
      const accountRes = await API.get("user/account/");
      setUsername(accountRes.data.user.username);
      setEmail(accountRes.data.user.email);
    } catch (error) { }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      {msg && (
        <div className="alert alert-success py-2" role="alert">
          {msg}
        </div>
      )}
      <p className="account-container-title">Account Details</p>
      <form className="edit-account-form">
        <div className="row">
          <div className="mb-3 col-12">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            className="col-12 mb-3"
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="button-primary" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
          <div className="mb-3 col-6 ">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              value={oldPassword}
              autoComplete="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              autoComplete="password"
              onChange={(e) => setNewPassword(e.target.value)}
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
          <button className="button-primary" onClick={handlePasswordChange}>
            Change Password
          </button>
        </div>
      </form>
    </>
  );
}
