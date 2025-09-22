import { useState, useEffect } from "react";
import API from "../api";
import "../style/style.css";
import { useParams } from "react-router-dom";
import CardsContainers from "../components/CardsContainers";

export default function UserPage({ userId }) {
  const [username, setUsername] = useState("");
  const [userPlans, setUserPlans] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const params = useParams();
  const id = params.id;

  const handleUnfriend = async () => {
    await API.post(`user/unfriend/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Successfully unfriended user.");
          setIsFriend(false);
        }
      })
      .catch((err) => {
        console.error("Error unfriending user:", err);
        setIsFriend(true);
      });
  };

  const handleFreindRequest = async () => {
    if (pendingRequest) {
      await API.post(`user/cancel-friend-request/${id}/`)
        .then(() => {
          setPendingRequest(false);
          setIsFriend(false);
        })
        .catch((err) => {
          console.error("Error cancelling friend request:", err);
          setPendingRequest(true);
          setIsFriend(false);
        });
    } else {
      await API.post(`user/add-friend-request/${id}/`)
        .then(() => {
          setPendingRequest(true);
          setIsFriend(false);
        })
        .catch((err) => {
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
        const accountRes = await API.get(`user/account/${id}/`);
        setUsername(
          accountRes.data.user.username[0].toUpperCase() +
            accountRes.data.user.username.slice(1)
        );
        const palnsRes = await API.get(`plan/host/${id}/`);

        setUserPlans(palnsRes.data);

        if (accountRes.data.user.friends_ids.includes(userId)) {
          setIsFriend(true);
        }
        if (accountRes.data.user.pending_requests_sent.includes(userId)) {
          setPendingRequest(true);
        }
      } catch (err) {
        console.error("Error fetching account data:", err);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="account-container">
      <h1 className="text-center header">{username}'s Account</h1>

      <div className="text-center " style={{ gap: "10px" }}>
        {isFriend ? <p>You are friends.</p> : <p>You are not friends, yet.</p>}
      </div>

      <div
        className="text-center"
        style={{
          width: "8rem",
          margin: "0 auto 1rem auto",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {isFriend && (
          <button className="btn btn-danger" onClick={handleUnfriend}>
            Unfriend
          </button>
        )}

        {(!isFriend && !pendingRequest && (
          <button className="btn btn-primary" onClick={handleFreindRequest}>
            Add Friend
          </button>
        )) ||
          (pendingRequest && (
            <button className="btn btn-secondary" onClick={handleFreindRequest}>
              Request Sent
            </button>
          ))}
      </div>

      <div className="card-container">
        <CardsContainers
          events={userPlans ? userPlans : []}
          willExpand={false}
          title={`Plans`}
          noDataMessage={`${username} has no plans yet.`}
        />
      </div>
    </div>
  );
}
