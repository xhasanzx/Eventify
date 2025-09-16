import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import API from "./api";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import EditPlanPage from "./pages/EditPlanPage";
import PlansPage from "./pages/PlansPage";

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
    <div className="main">
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
                    friendsEvents={friendsEvents}
                  />
                }
              />
              <Route
                path="/your-plans"
                element={
                  <PlansPage
                    events={userEvents}
                    isHost={true}
                    isFriends={false}
                    hostUsername={username}
                  />
                }
              />
              <Route
                path="/friends"
                element={
                  <PlansPage
                    events={friendsEvents}
                    isHost={false}
                    isFriends={true}
                    hostUsername={"friends"}
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
