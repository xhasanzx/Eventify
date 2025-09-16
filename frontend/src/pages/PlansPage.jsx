import CardsContainers from "../components/CardsContainers";

export default function PlansPage({
  events,    
  isHost,
  isFriends,
  hostUsername,
}) {
  return (
    <>
      <CardsContainers
        events={events ? events : []}
        title={
          isHost
            ? "Your Plans"
            : isFriends
            ? "Friends's Plans"
            : `${hostUsername}'s Plans`
        }
        noDataMessage={
          isHost
            ? "You have no plans yet."
            : isFriends
            ? "Friends has no plans yet."
            : `${hostUsername} has no plans yet.`
        }
      />
    </>
  );
}
