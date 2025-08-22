import { useEffect } from "react";
import API from "./api";

export function EventsList({ events, setEvents }) {
  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data.events))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h3>Current Events</h3>
      {events.length === 0 && <p>No events founds</p>}
      <div className="d-flex flex-wrap gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="card"
            style={{
              width: "18rem",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            <img
              src={event.image_url}
              alt={event.title}
              style={{ width: "300px", height: "150px" }}
            />
            <div className="card-body">
              <div>{event.title}</div>
              <div>{event.description}</div>
              <div>{event.price}$</div>
              <div>{event.location}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
