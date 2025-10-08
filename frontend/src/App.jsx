import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import API from "./api";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import EditPlanPage from "./pages/EditPlanPage";
import PlansPage from "./pages/PlansPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import UserPage from "./pages/UserPage";

function App() {
  const [userId, setUserId] = useState(null);
  const [userPlans, setUserPlans] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsPlans, setFriendsPlans] = useState([]);
  const [allFriendsPlans, setAllFriendsPlans] = useState([]);

  // Get User Account
  useEffect(() => {
    API.get("user/account/")
      .then((res) => {
        setUserId(res.data.user.id);
      })
      .catch((err) => console.error(err));
  }, []);

  // Get User Plans
  useEffect(() => {
    API.get("user/plans/")
      .then((res) => {
        setUserPlans(res.data.plans);
      })
      .catch((err) => console.error(err));
  }, []);

  // Get User Friends
  useEffect(() => {
    API.get("user/friends/")
      .then((res) => {
        setFriends(res?.data?.friends?.map((friend) => friend.id));
      })
      .catch((err) => console.error(err));
  }, []);

  // Get Friends' Plans
  useEffect(() => {
    if (!friends || friends.length === 0) return;
    Promise.all(friends.map((friend) => API.get(`plan/host/${friend}/`)))
      .then((responses) => {
        const data = responses.map((r, i) => ({
          id: friends[i],
          username: r.data[0]?.host_username || "Unknown",
          plans: r.data || [],
        }));
        setFriendsPlans(data);

        const allPlans = data.flatMap((friend) => friend.plans);
        setAllFriendsPlans(allPlans);
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
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* catch-all redirects to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage friendsPlans={friendsPlans ? friendsPlans : []} />
            }
          />
          <Route
            path="/home"
            element={<HomePage friendsPlans={allFriendsPlans} />}
          />
          <Route
            path="/your-plans"
            element={
              <PlansPage
                plans={userPlans}
                setPlans={setUserPlans}
                isHost={true}
                isFriendsPage={false}
              />
            }
          />
          <Route
            path="/friends"
            element={
              <PlansPage
                plans={allFriendsPlans}
                setPlans={setFriendsPlans}
                isHost={false}
                isFriendsPage={true}
              />
            }
          />
          <Route path="/plan/:id" element={<PlanDetailsPage />} />
          <Route path="/plan/:id/edit" element={<EditPlanPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/account/:id"
            element={<UserPage userId={userId} setFriends={setFriends} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
