import { Link } from "react-router-dom";

export default function PlanCard({ event }) {
  return (
    <Link to={`/plan/${event.id}`} style={{ textDecoration: "none" }}>
      <div
        key={event.id}
        className="card"
        style={{
          height: "400px",
          width: "300px",
          marginTop: "10px",
          padding: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          transition: "transform 0.2s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0)")
        }
      >
        {event.image_url && (
          <img
            className="card-img-top"
            src={event.image_url}
            alt={event.title}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
        <div
          className="card-body p-2"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1, minHeight: 0 }}>
            <h6
              className="card-title mb-1"
              style={{
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {event.title}
            </h6>

            <p
              className="card-text text-muted mb-2"
              style={{
                lineHeight: 1.3,
                fontSize: "0.95rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {event.location}
            </p>

            <p
              className="card-text mb-2"
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.3,
                marginBottom: "1.5rem",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {event.description}
            </p>
          </div>
          <div style={{ marginTop: "10px", paddingTop: "8px" }}>
            {!event.is_host && (
              <p className="card-text mb-2" style={{ fontSize: "0.9rem" }}>
                Host: {event.host_username}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
