import { useState } from "react";
import CardsContainers from "../components/CardsContainers";
import AddPlanForm from "../components/AddPlanForm";

export default function PlansPage({
  events,
  setEvents,
  isHost,
  isFriendsPage,
  willExpand,
}) {
  return (
    <div className="row" style={{ margin: "0 auto" }}>
      {isHost && (
        <div className={"col-8"}>
          <CardsContainers
            events={events ? events : []}
            willExpand={willExpand}
            title={"Your Plans"}
            noDataMessage={"You have no plans yet."}
          />
        </div>
      )}

      {isHost && (
        <div className="col-4">
          <AddPlanForm events={events} setEvents={setEvents} />
        </div>
      )}

      {isFriendsPage &&
        events.map((friendsPlans) => (
          <CardsContainers
            events={friendsPlans ? friendsPlans.plans : []}
            willExpand={willExpand}
            title={`${friendsPlans.username}'s Plans`}
            noDataMessage={`${friendsPlans.username} has no plans yet.`}
          />
        ))}
    </div>
  );
}
