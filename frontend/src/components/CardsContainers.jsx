import React from "react";
import PlanCard from "./PlanCard";
import "../style/style.css";

export default function CardsContainers({ events, title, noDataMessage }) {
  return (
    <div className="cards-container justify-content-center mb-4">
      <h2 className="text-center mb-3">{title}</h2>
      {events?.length === 0 && (
        <p style={{ fontSize: "28px" }} className="text-center text-muted">
          {noDataMessage}
        </p>
      )}

      <div
        className="d-flex flex-row flex-nowrap gap-3"
        style={{ overflowX: "auto", paddingBottom: "6px" }}
      >
        {events?.map((event) => (
          <div style={{ flex: "0 0 auto" }} key={event.id}>
            <PlanCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
