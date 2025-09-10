import UserPlans from "../components/UserPlans";
import FriendsPlans from "../components/FriendsPlans";

export default function Home({
  userEvents,
  setUserEvents,
  friendsEvents,
  setFriendsEvents,
}) {
  return (
    <div>
      <div className="text-center">
        <h1>Welcome to Meet Up</h1>
      </div>
      <div className="container py-4">
        <UserPlans events={userEvents} setEvents={setUserEvents} />
      </div>
      <div className="container py-4">
        <FriendsPlans events={friendsEvents} setEvents={setFriendsEvents} />
      </div>
    </div>
  );
}
