// Removed unused SVG import
import Logout from "../components/Logout";
import EditAccountForm from "../components/EditAccountForm";
import API from "../api";
import "../style/style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const [username, setUsername] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  function handleOpenLogout() {
    setShowLogout(true);
  }

  function handleCancelLogout() {
    setShowLogout(false);
  }

  function handleConfirmLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  const handleAcceptRequest = async (id) => {
    await API.post(`user/accept-friend-request/${id}/`).then((res) => {
      setFriends([...friends, res.data.friend]);
      setReceivedRequests(
        receivedRequests.filter((request) => request.from_user_id !== id)
      );
    });
  };

  const handleRejectRequest = async (id) => {
    await API.post(`user/reject-friend-request/${id}/`).then(() => {
      setReceivedRequests(
        receivedRequests.filter((request) => request.from_user_id !== id)
      );
    });
  };

  const handleCancelRequest = async (id) => {
    await API.post(`user/cancel-friend-request/${id}/`).then(() => {
      setSentRequests(
        sentRequests.filter((request) => request.to_user_id !== id)
      );
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
        setDateJoined(accountRes.data.user.date_joined);
        const [friendsRes, requestsRes] = await Promise.all([
          API.get("user/friends/"),
          API.get("user/friend-requests/"),
        ]);
        setFriends(friendsRes.data.friends);
        setSentRequests(requestsRes.data.sent_requests);
        setReceivedRequests(requestsRes.data.received_requests);
      } catch (err) {
        console.error("Error fetching account data:", err);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <>
      {showLogout && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}

      <div className="account-page row">
        <div className="account-header col-12">
          <div className="account-header-title-container">
            <div className="avatar-circle">{username?.[0]?.toUpperCase()}</div>
            <p className="account-header-title">
              {username
                ? username[0].toUpperCase() + username.slice(1)
                : "Username"}
            </p>
            <p className="account-header-text">Friends: {friends?.length}</p>
            <p className="account-header-text">
              Joined: {new Date(dateJoined).toLocaleDateString()}
            </p>
          </div>

          <button
            className="button-danger"
            style={{ width: "6rem" }}
            onClick={handleOpenLogout}
          >
            Logout
          </button>
        </div>

        <div className="account-page-main-container">
          <div className="account-container">
            <EditAccountForm />
          </div>

          <div className="account-container">
            <p className="account-container-title">Friends</p>
            <div className="friends-list">
              <p style={{ textAlign: "center" }}>
                {friends?.length == 0 && <p>No friends</p>}
              </p>

              {friends?.map((friend) => (
                <Link
                  key={friend.id}
                  to={`/account/${friend.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="friend-item">
                    {friend?.username[0].toUpperCase() +
                      friend?.username.slice(1)}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="account-container">
            <p className="account-container-title">Received</p>
            <div className="requests-list">
              <p style={{ textAlign: "center" }}>
                {receivedRequests?.length == 0 && <p>No friend requests</p>}
              </p>

              {receivedRequests?.map((requestedBy) => (
                <Link
                  key={requestedBy.id}
                  className="requests-item"
                  to={`/account/${requestedBy.from_user_id}`}
                  style={{ textDecoration: "none" }}
                >
                  {requestedBy.from_user[0].toUpperCase() +
                    requestedBy.from_user.slice(1)}

                  <div className="requests-item-buttons">
                    <button
                      className="button-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAcceptRequest(requestedBy.from_user_id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="button-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRejectRequest(requestedBy.from_user_id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="account-container">
            <p className="account-container-title">Sent</p>
            <div className="requests-list">
              <p style={{ textAlign: "center" }}>
                {sentRequests?.length == 0 && <p>No sent requests</p>}
              </p>

              {sentRequests?.map((sentTo) => (
                <Link
                  key={sentTo.id}
                  className="requests-item"
                  to={`/account/${sentTo.to_user_id}`}
                  style={{ textDecoration: "none" }}
                >
                  {sentTo?.to_user[0].toUpperCase() + sentTo?.to_user.slice(1)}
                  <button
                    className="button-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancelRequest(sentTo.to_user_id);
                    }}
                  >
                    Cancel
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
