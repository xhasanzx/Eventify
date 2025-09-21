import { useState, useEffect } from "react";
import API from "../api";
import "../style/style.css";

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const accountRes = await API.get("user/account/");
        setUsername(
          accountRes.data.user.username[0].toUpperCase() +
            accountRes.data.user.username.slice(1)
        );
        const [friendsRes, requestsRes] = await Promise.all([
          API.get("user/friends/"),
          API.get("user/friend-requests/"),
        ]);

        setFriends(friendsRes?.data?.friends ? friendsRes.data.friends : []);
        setReceivedRequests(
          requestsRes?.data?.received_requests
            ? requestsRes.data.received_requests
            : []
        );
        setSentRequests(
          requestsRes?.data?.sent_requests ? requestsRes.data.sent_requests : []
        );
      } catch (err) {
        console.error("Error fetching account data:", err);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="account-container">
        <h1 className="text-center header">{username}'s Account</h1>

        <div className="account-friends-container">
          <h1 className="header">Friends</h1>
          <div className="account-friends-list">
            {friends?.length === 0 && <p>No friends</p>}
            {friends.map((friend) => (
              <div key={friend.id}>
                <p>{friend.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="account-container">
        <div>
          <h1 className="header">Requests</h1>
          <div className="account-requests-container">
            <h1 className="header">Received</h1>
            <div className="account-requests-list">
              {receivedRequests?.length === 0 && <p>No friend requests</p>}
              {receivedRequests?.length > 0 &&
                receivedRequests.map((requestedBy) => (
                  <div key={requestedBy.id}>
                    <p>{requestedBy.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="account-requests-container">
            <h1 className="header">Sent</h1>
            <div className="account-requests-list">
              {sentRequests?.length === 0 && <p>No sent requests</p>}
              {sentRequests?.length > 0 &&
                sentRequests.map((sentTo) => (
                  <div key={sentTo.id}>
                    <p>{sentTo.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
