import { Link } from "react-router-dom";
import "../style/style.css";

export default function PlanCard({ event }) {
  return (
    <Link to={`/plan/${event?.id}`} style={{ textDecoration: "none" }}>
      <div
        key={event?.id}
        className="plan-card"
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        {event?.image_url && <img src={event?.image_url} />}
        <div className="plan-card-body">
          <h6 className="plan-card-title mb-1">{event?.title}</h6>

          <p className="plan-card-text text-muted mb-1">
            {event?.location}
            {event?.date ? " | " + event?.date.split("T")[0] : ""}
          </p>

          <p className="plan-card-text mb-1">{event?.description}</p>

          {!event?.is_host && (
            <p className="plan-card-text mb-1">Host: {event?.host_username}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
