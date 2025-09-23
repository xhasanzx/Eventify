import { useState, useEffect } from "react";
import API from "../api";
import "../style/style.css";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const handleAcceptRequest = async (id) => {
    await API.post(`user/accept-friend-request/${id}/`).then(() => {
      setReceivedRequests(
        receivedRequests.filter((request) => request.id !== id)
      );
    });
  };

  const handleRejectRequest = async (id) => {
    await API.post(`user/reject-friend-request/${id}/`).then(() => {
      setReceivedRequests(
        receivedRequests.filter((request) => request.id !== id)
      );
    });
  };

  const handleCancelRequest = async (id) => {
    await API.post(`user/cancel-friend-request/${id}/`).then(() => {
      setSentRequests(sentRequests.filter((request) => request.id !== id));
    });
  };

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
        setSentRequests(
          requestsRes?.data?.sent_requests ? requestsRes.data.sent_requests : []
        );
        setReceivedRequests(
          requestsRes?.data?.received_requests
            ? requestsRes.data.received_requests
            : []
        );
      } catch (err) {
        console.error("Error fetching account data:", err);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="row" style={{ gap: "2rem" }}>
      <h1
        className="header col-12"
        style={{ textAlign: "left", marginBottom: "2rem" }}
      >
        {username}'s Account
      </h1>
      <div className="account-friends-container col-5">
        <h1 className="header">Account Details</h1>
        <div className="account-details-list">
          <p>Username: {username}</p>
        </div>
      </div>
      <div className="account-friends-container  col-5">
        <h1 className="header">Friends</h1>
        <div className="account-friends-list row">
          {friends?.length === 0 && <p>No friends</p>}

          {friends.map((friend) => (
            <Link
              className="col-2 "
              key={friend.id}
              to={`/account/${friend.id}`}
              style={{ textDecoration: "none" }}
            >
              <p>
                {friend.username[0].toUpperCase() + friend.username.slice(1)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="account-requests-container col-5">
        <h1 className="header">Received</h1>
        <div className="account-requests-list">
          {receivedRequests?.length == 0 && <p>No friend requests</p>}
          {receivedRequests.map((requestedBy) => (
            <div className="account-request-list-item" key={requestedBy.id}>
              <Link
                className="account-request-list-item d-flex"
                to={`/account/${requestedBy.id}`}
                style={{ textDecoration: "none" }}
              >
                <p>
                  {requestedBy.username[0].toUpperCase() +
                    requestedBy.username.slice(1)}
                </p>
              </Link>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();

                  handleAcceptRequest(requestedBy.id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleRejectRequest(requestedBy.id);
                }}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="account-requests-container col-5">
        <h1 className="header">Sent</h1>
        <div className="account-requests-list">
          {sentRequests?.length == 0 && <p>No sent requests</p>}
          {sentRequests?.map((sentTo) => (
            <div className="account-request-list-item" key={sentTo.id}>
              <Link
                className="account-request-list-item"
                to={`/account/${sentTo.id}`}
                style={{ textDecoration: "none" }}
              >
                <p>
                  {sentTo.username[0].toUpperCase() + sentTo.username.slice(1)}
                </p>
              </Link>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancelRequest(sentTo.id);
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
