import API from "../api";
import { useState, useEffect } from "react";
import "../style/style.css";

export default function EditAccountForm() {
  const [id, setId] = useState("");
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

    // if (password !== password2) {
    //   setError("Passwords do not match.");
    //   return;
    // }
    // if (password.length < 3) {
    //   setError("Password must be at least 3 characters.");
    //   return;
    // }

    API.put(`user/update/${id}/`, { username, email })
      .then((res) => {
        console.log(res);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async () => {
    try {
      const accountRes = await API.get("user/account/");
      setUsername(accountRes.data.user.username);
      setEmail(accountRes.data.user.email);
      setPassword(accountRes.data.user.password);
      setId(accountRes.data.user.id);
    } catch (error) {}
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
          <div className="mb-3 col-6 ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={""}
              autoComplete="password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              value={""}
              autoComplete="password"
              // onChange={(e) => setPassword2(e.target.value)}
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
