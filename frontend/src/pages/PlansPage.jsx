import CardsContainers from "../components/CardsContainers";
import AddPlanForm from "../components/AddPlanForm";

export default function PlansPage({
  events,
  setEvents,
  isHost,
  isFriends,
  hostUsername,
  willExpand,
}) {
  return (
    <>
      <CardsContainers
        events={events ? events : []}
        willExpand={willExpand}
        title={
          isHost
            ? "Your Plans"
            : isFriends
            ? "Friends' Plans"
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
      {isHost && (
        <div className="container">
          <AddPlanForm events={events} setEvents={setEvents} />
        </div>
      )}
    </>
  );
}
