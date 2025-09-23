import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";
import { useState } from "react";

const navItems = [
  { path: "/home", label: "Home" },
  { path: "/your-plans", label: "Your Plans" },
  { path: "/friends", label: "Friends" },
  { path: "/account", label: "Account" },
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
    window.location.href = "/login";
  }

  return (
    <>
      {showLogout && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
      <nav className="navbar navbar-expand navbar-dark shadow-sm">
        <div className="container">
          <Link
            className="nav-item header"
            to="/home"
            style={{
              color: "whitesmoke",
              fontSize: "35px",
              letterSpacing: "-2px",              
            }}
          >
            SUHBA
          </Link>         

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item me-1">
                  <Link
                    className={`nav-link px-3 py-2 fw-semibold ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    style={{
                      borderRadius: "8px",
                      color: "#fff",
                      backgroundColor:
                        location.pathname === item.path
                          ? "rgba(255,255,255,0.15)"
                          : "transparent",
                    }}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="nav-item d-flex align-items-center ms-2">
                <button
                  className="btn btn-danger text-white d-flex"
                  style={{
                    height: "45px",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    borderRadius: "8px",
                  }}
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
