import { Link } from "react-router-dom";
import "../style/style.css";

export default function PlanCard({ plan }) {
  const iconWidth = "24";
  const iconHeight = "24";

  // TODO: remove this after testing
  const showImages = false;
  if (!showImages) {
    plan.image_url = null;
  }

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

        <div
          className={`${
            plan?.image_url ? "plan-card-body-with-img" : "plan-card-body"
          }`}
        >
          <p className="plan-card-title">{plan?.title}</p>
          <p className={`plan-card-text ${plan?.image_url ? "has-img" : ""}`}>
            {plan?.description}
          </p>
          <div className="plan-card-meta-container">
            {!plan?.is_host && (
              <p className="plan-card-meta">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={iconWidth}
                  height={iconHeight}
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                {!plan?.is_host && plan?.host_username
                  ? " " +
                    plan?.host_username[0].toUpperCase() +
                    plan?.host_username.slice(1)
                  : ""}
              </p>
            )}
            <p className="plan-card-meta">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={iconWidth}
                height={iconHeight}
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 17 17"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              {plan?.location ? " " + plan?.location : ""}
            </p>
            <p className="plan-card-meta">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={iconWidth}
                height={iconHeight}
                fill="currentColor"
                className="bi bi-calendar"
                viewBox="0 0 19 19"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>
              {plan?.date
                ? " " + plan?.date.split("T")[0].split("-").reverse().join("/")
                : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
