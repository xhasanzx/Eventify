import { useEffect } from "react";
import API from "../api";

export default function EventsList({ events, setEvents }) {
  useEffect(() => {
    API.get("/user/events/")
      .then((res) => {
        // Handle backend response structure
        if (res.data.events) {
          setEvents(res.data.events);
        } else if (res.data.error) {
          // No events found or other error
          console.log(res.data.error);
          setEvents([]);
        } else {
          // Fallback - set empty array
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, [setEvents]);

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      API.delete(`/events/${eventId}/`)
        .then(() => {
          setEvents(events.filter((event) => event.id !== eventId));
          alert("Event deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting event:", err);
          alert("Failed to delete event. Please try again.");
        });
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginBottom: "25px" }}
    >
      <div style={{ color: "#F6F6F6", maxWidth: "1200px", width: "100%" }}>
        {(!events || events.length === 0) && (
          <p className="text-center text-muted">No events found</p>
        )}
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {events &&
            Array.isArray(events) &&
            events.map((event) => (
              <div
                key={event.id}
                className="card"
                style={{
                  width: "280px",
                  padding: "1rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  transition: "transform 0.2s ease-in-out",
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
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title mb-2">{event.title}</h6>
                  <p className="card-text text-muted small mb-2">
                    {event.location}
                  </p>
                  <p className="card-text small mb-2">{event.description}</p>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary">${event.price}</span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    style={{
                      fontSize: "11px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                    onClick={() => handleDelete(event.id)}
                    title="Delete Event"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
