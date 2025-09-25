import React from "react";
import PlanCard from "./PlanCard";
import "../style/style.css";

export default function CardsContainers({
  plans,
  isHome,  
  isUserPage,
  noDataMessage,
}) {
  if (isHome) {
    plans = plans.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="cards-container">
      {plans?.length === 0 && (
        <p style={{ fontSize: "28px" }} className="text-center text-muted">
          {noDataMessage[0].toUpperCase() + noDataMessage.slice(1)}
        </p>
      )}

      <div className="row">
        {plans?.map((plan) => (
          <div
            className={`plans-view ${isUserPage ? "plans-grid col-6" : "col-4"}`}
            key={plan.id}
          >
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}
