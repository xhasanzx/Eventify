import React from "react";
import PlanCard from "./PlanCard";

export default function UserPlans({ events, setEvents }) {
  const safeEvents = Array.isArray(events) ? events : [];
  return (
    <div>
      <h2>My Plans</h2>
      <div style={{ color: "#F6F6F6", maxWidth: "1200px", width: "100%" }}>
        {safeEvents.length === 0 && (
          <p className="text-center text-muted">You have no plans yet</p>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {safeEvents.map((event) => (
            <PlanCard
              canDelete={true}
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
