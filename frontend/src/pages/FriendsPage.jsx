import FriendsPlans from "../components/FriendsPlans";

export default function FriendsPage({ friendsEvents, setFriendsEvents }) {
  return (
    <div>
      <FriendsPlans
        events={friendsEvents ? friendsEvents : []}
        setEvents={setFriendsEvents}
      />
    </div>
  );
}
