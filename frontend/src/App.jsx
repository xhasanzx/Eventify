import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import MyPlans from "./pages/MyPlans";
import FriendsPage from "./pages/Friends";
import LoginForm from "./components/LoginForm";
import API from "./api";

function App() {
  const [userEvents, setUserEvents] = useState([]);
  const [friendsEvents, setFriendsEvents] = useState([]);
  
  useEffect(() => {
    API.get("user/plans/")
      .then((res) => {
        setUserEvents(res.data.plans);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get("user/friends/")
      .then((res) => {
        setFriendsEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
    price: 0,
  });
  
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
              element={
                <Home
                  userEvents={userEvents}
                  setUserEvents={setUserEvents}
                  friendsEvents={friendsEvents}
                  setFriendsEvents={setFriendsEvents}
                />
              }
            />
            <Route
              path="/MyPlans"
              element={
                <MyPlans
                  userEvents={userEvents}
                  setUserEvents={setUserEvents}
                  newEvent={newEvent}
                  setNewEvent={setNewEvent}
                />
              }
            />
            <Route
              path="/Friends"
              element={
                <FriendsPage
                  friendsEvents={friendsEvents}
                  setFriendsEvents={setFriendsEvents}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
