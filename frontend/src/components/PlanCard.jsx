import API from "../api";

export default function PlanCard({ canDelete = false, event, setEvents }) {
  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      API.delete(`/plan/delete/${eventId}/`)
        .then(() => {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
          );
          alert("Plan deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting plan:", err);
          alert("Failed to delete plan. Please try again.");
        });
    }
  };

  return (
    <div>
      <div
        key={event.id}
        className="card"
        style={{
          width: "300px",
          height: "380px",
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
        <div
          className="card-body p-2"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            gap: "12px",
            paddingBottom: "4px",
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
                fontSize: "0.95rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginBottom: "12px",
              }}
            >
              {event.description}
            </p>
          </div>

          {!canDelete && (
            <p className="card-text mb-2" style={{ fontSize: "0.9rem" }}>
              {event.host_username}
            </p>
          )}
          {canDelete && (
            <button
              className="btn btn-danger w-100 mt-auto"
              style={{
                fontSize: "0.95rem",
                padding: "8px 10px",
                borderRadius: "8px",
                marginTop: "12px",
              }}
              onClick={() => handleDelete(event.id)}
              title="Delete Event"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
