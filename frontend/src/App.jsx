import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import API from "./api";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import MyPlansPage from "./pages/MyPlansPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import EditPlanPage from "./pages/EditPlanPage";

function App() {
  const [username, setUsername] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsEvents, setFriendsEvents] = useState([]);

  // Get User Plans
  useEffect(() => {
    API.get("user/plans/")
      .then((res) => {
        setUsername(res.data.username);
        setUserEvents(res.data.plans);
      })
      .catch((err) => console.error(err));
  }, []);

  // Get User Friends
  useEffect(() => {
    API.get("user/friends/")
      .then((res) => {
        setFriends(res.data.friends);
      })
      .catch((err) => console.error(err));
  }, []);

  // Get Friends' Plans
  useEffect(() => {
    if (!friends || friends.length === 0) return;
    Promise.all(friends.map((friend) => API.get(`plan/host/${friend}/`)))
      .then((responses) => {
        const merged = responses.flatMap((r) => r.data || []);
        setFriendsEvents(merged);
      })
      .catch((err) => console.error(err));
  }, [friends]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
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
      <Router>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div style={{ backgroundColor: "#F9F6F7", minHeight: "100vh" }}>
      {isLoggedIn && (
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    username={username}
                    userEvents={userEvents}
                    setUserEvents={setUserEvents}
                    friendsEvents={friendsEvents}
                    setFriendsEvents={setFriendsEvents}
                  />
                }
              />
              <Route
                path="/your-plans"
                element={
                  <MyPlansPage
                    userEvents={userEvents}
                    setUserEvents={setUserEvents}
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                  />
                }
              />
              <Route
                path="/friends"
                element={
                  <FriendsPage
                    friendsEvents={friendsEvents}
                    setFriendsEvents={setFriendsEvents}
                  />
                }
              />
              <Route path="/plan/:id" element={<PlanDetailsPage />} />
              <Route path="/plan/:id/edit" element={<EditPlanPage />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
