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
    <div
      className="row"
      style={{
        margin: `${isHost ? "0 -4rem 0 -4rem" : "0"}`,
      }}
    >
      <div className={`col-${isHost ? "8" : "12"}`}>
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
      </div>

      {isHost && (
        <div className="col-4">
          <AddPlanForm events={events} setEvents={setEvents} />
        </div>
      )}
    </div>
  );
}
