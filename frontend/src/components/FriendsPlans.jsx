import React, { useEffect } from "react";
import PlanCard from "./PlanCard";

export default function FriendsPlans({ events, setEvents }) {
  console.log(events);
  const safeEvents = Array.isArray(events) ? events : [];
  return (
    <>
      <div
        className="card"
        style={{
          padding: "1.5rem",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-3">Friends' Plans</h2>
        <div style={{ color: "#F6F6F6", maxWidth: "1200px", width: "100%" }}>
          {safeEvents.length === 0 && (
            <p style={{ fontSize: "28px" }} className="text-center text-muted">
              Your friends have no plans, yet
            </p>
          )}

          <div style={{ overflowX: "auto", paddingBottom: "6px" }}>
            <div className="d-flex flex-row flex-nowrap gap-3">
              {safeEvents.map((event) => (
                <div style={{ flex: "0 0 auto" }} key={event.id}>
                  <PlanCard event={event} setEvents={setEvents} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
