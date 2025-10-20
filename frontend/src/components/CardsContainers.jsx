import React from "react";
import PlanCard from "./PlanCard";
import "../style/style.css";

export default function CardsContainers({
  plans,
  isHome,  
  noDataMessage,
}) {
  if (isHome) {
    plans = plans.sort(() => Math.random() - 0.5);
  }

  return (
    <div>
      {plans?.length === 0 && (
        <p
          style={{
            fontSize: "var(--font-size-medium)",
            color: "var(--text-dark)",
            textAlign: "center",
          }}
        >
          {noDataMessage[0].toUpperCase() + noDataMessage.slice(1)}
        </p>
      )}

      <div className="cards-container">
        {plans?.map((plan) => (
          <div key={plan.id} className="cards-container-item">
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}
