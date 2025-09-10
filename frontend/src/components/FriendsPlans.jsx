import React, { useEffect } from "react";
import PlanCard from "./PlanCard";

export default function FriendsPlans({ events, setEvents }) {
  const safeEvents = Array.isArray(events) ? events : [];
  return (
    <div>
      <h2>Friends' Plans</h2>
      <div style={{ color: "#F6F6F6", maxWidth: "1200px", width: "100%" }}>
        {safeEvents.length === 0 && (
          <p className="text-center text-muted">No friends' plans yet</p>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {safeEvents.map((event) => (
            <PlanCard
              canDelete={false}
              key={event.id}
              event={event}
              setEvents={setEvents}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
