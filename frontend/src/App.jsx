import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Events from "./pages/events";
import MyPlans from "./pages/my-plans";
import FriendsPlans from "./pages/friends-plans";
import LoginForm from "./components/login_form";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  // Listen for login state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
    };

    const handleLoginSuccess = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginSuccess", handleLoginSuccess);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: "#F9F6F7", minHeight: "100vh" }}>
        <LoginForm />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F9F6F7", minHeight: "100vh" }}>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={<Home events={events} setEvents={setEvents} />}
            />
            <Route
              path="/events"
              element={<Events events={events} setEvents={setEvents} />}
            />
            <Route path="/my-plans" element={<MyPlans />} />
            <Route path="/friends-plans" element={<FriendsPlans />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
