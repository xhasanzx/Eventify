import { Link, useLocation } from "react-router-dom";
import Logout from "./logout";
import { useEffect, useState } from "react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/MyPlans", label: "My Plans" },
  { path: "/Friends", label: "Friends" },
];

export default function Navbar() {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  function handleOpenLogout() {
    setShowLogout(true);
  }

  function handleCancelLogout() {
    setShowLogout(false);
  }

  function handleConfirmLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  }

  return (
    <>
      {showLogout && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm"
        style={{ backgroundColor: "#4F98CA" }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Planify
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleOpenLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
