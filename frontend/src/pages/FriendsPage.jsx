import CardsContainers from "../components/CardsContainers";

export default function FriendsPage({ friendsEvents }) {
  return (
    <div>
      <CardsContainers
        events={friendsEvents ? friendsEvents : []}
        title="Friends' Plans"
        noDataMessage="Your friends have no plans yet."
      />
    </div>
  );
}
