import { Link } from "react-router-dom";
import "../style/style.css";

export default function PlanCard({ plan }) {
  return (
    <Link to={`/plan/${plan?.id}`} style={{ textDecoration: "none" }}>
      <div
        className="plan-card"
        key={plan?.id}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        <div className="plan-card-image-container">
          {plan?.image_url && <img src={plan?.image_url} />}
        </div>

        <div className="plan-card-body">
          <h6 className="plan-card-title">{plan?.title}</h6>
          
          <p className="plan-card-meta">
            {!plan?.is_host && plan?.host_username
              ? plan?.host_username[0].toUpperCase() +
                plan?.host_username.slice(1) +
                " | "
              : ""}
            {plan?.location ? plan?.location : ""}
            {plan?.date ? " | " + plan?.date.split("T")[0] : ""}
          </p>

          <p className="plan-card-text">{plan?.description}</p>
        </div>
      </div>
    </Link>
  );
}
