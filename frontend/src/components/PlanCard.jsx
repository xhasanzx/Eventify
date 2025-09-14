import API from "../api";

export default function PlanCard({ event, setEvents }) {
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
    <div
      key={event.id}
      className="card"
      style={{
        width: "280px",
        height: "360px",
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
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
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
              lineHeight: 1,
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
              lineHeight: 1.2,
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

          {event.is_host && (
            <button
              className="btn btn-danger w-100"
              style={{
                fontSize: "0.95rem",
                padding: "8px 8px",
                borderRadius: "8px",
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
