import MyPlans from "../components/MyPlans";
import FriendsPlans from "../components/FriendsPlans";

export default function HomePage({
  username,
  userEvents,
  setUserEvents,
  friendsEvents,
  setFriendsEvents,
}) {
  return (
    <div>
      <div className="text-center">
        <h2>Welcome, {username}</h2>
      </div>
      <div className="container py-4">
        <MyPlans
          events={userEvents ? userEvents : []}
          setEvents={setUserEvents}
        />
      </div>
      <div className="container py-4">
        <FriendsPlans
          events={friendsEvents ? friendsEvents : []}
          setEvents={setFriendsEvents}
        />
      </div>
    </div>
  );
}
