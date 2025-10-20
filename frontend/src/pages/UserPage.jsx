import { useState, useEffect } from "react";
import API from "../api";
import "../style/style.css";
import { useParams } from "react-router-dom";
import CardsContainers from "../components/CardsContainers";

export default function UserPage({ userId, setFriends }) {
  const [isLoading, setIsLoading] = useState(true);
  const [friendsNumber, setFriendsNumber] = useState(0);
  const [user, setUser] = useState({
    username: "",
    friends: [],
    plans: [],
  });
  const [isFriend, setIsFriend] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const params = useParams();
  const id = params.id;

  const handleUnfriend = async () => {
    setFriendsNumber(user.friends.length - 1);
    setIsFriend(false);

    await API.post(`user/unfriend/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Successfully unfriended user.");
          setUser((prev) => ({
            ...prev,
            friends: prev.friends.filter((friend) => friend !== id),
          }));
          setFriends((prev) => prev.filter((friend) => friend !== id));
        }
      })
      .catch((err) => {
        console.error("Error unfriending user:", err);
        setIsFriend(true);
        setFriendsNumber(user.friends.length);
      });
  };

  const handleFreindRequest = async () => {
    if (user.pendingRequest === true) {
      setPendingRequest(false);
      setIsFriend(false);

      await API.post(`user/cancel-friend-request/${id}/`).catch((err) => {
        console.error("Error cancelling friend request:", err);
        setPendingRequest(true);
        setIsFriend(false);
      });
    } else {
      setPendingRequest(true);
      setIsFriend(false);
      await API.post(`user/send-friend-request/${id}/`).catch((err) => {
        console.error("Error sending friend request:", err);
        setPendingRequest(false);
        setIsFriend(false);
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        await API.get(`user/account/${id}/`).then((res) => {
          setUser((prev) => ({
            ...prev,
            username:
              res.data.user.username[0].toUpperCase() +
              res.data.user.username.slice(1),
            friends: res.data.user.friends,
          }));
          setFriendsNumber(res.data.user.friends.length);
          setIsFriend(
            res.data.user.friends.some((friendId) => friendId == userId)
          );
        });

        await API.get(`plan/host/${id}/`).then((res) => {
          setUser((prev) => ({ ...prev, plans: res.data }));
        });

        if (isFriend) {
          setPendingRequest(false);
        }

        await API.get(`user/friend-requests/`).then((res) => {
          if (
            res.data.sent_requests.some((request) => request.to_user_id == id)
          ) {
            setPendingRequest(true);
          } else {
            setPendingRequest(false);
          }
        });
      } catch (err) {
        console.error("Error fetching account data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id, userId]);

  return (
    <>
      {isLoading ? (
        <p className="header text-center">Loading...</p>
      ) : (
        <>
          <div className="avatar-circle">
            <p>{user.username?.[0]?.toUpperCase()}</p>
          </div>
          <div className="user-page-container">
            <div className="user-page-text-container">
              <p
                style={{
                  fontSize: "3rem",
                  color: "var(--text-medium)",
                  WebkitTextStroke: "2px var(--bg-dark)",
                  fontWeight: "800",
                  marginBottom: "0",
                }}
              >
                {user.username
                  ? user.username[0].toUpperCase() + user.username.slice(1)
                  : "Username"}
              </p>
              <div className="user-page-meta-container">
                <p className="user-page-meta-text">Friends: {friendsNumber}</p>
                <p className="user-page-meta-text">
                  Plans: {user.plans.length}
                </p>
              </div>
            </div>

            {isFriend ? (
              <button
                className="button-danger"
                onClick={handleUnfriend}
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                Friends
              </button>
            ) : pendingRequest ? (
              <button
                className="button-cancel"
                onClick={handleFreindRequest}
                style={{ backgroundColor: "var(--bg-light)" }}
              >
                Request Sent
              </button>
            ) : (
              <button className="button-primary" onClick={handleFreindRequest}>
                Add friend
              </button>
            )}
          </div>

          <div>
            <CardsContainers             
              plans={user.plans ? user.plans : []}
              isHome={false}
              isUserPage={true}
              noDataMessage={`${user.username} has no plans yet.`}
            />
          </div>
        </>
      )}
    </>
  );
}
