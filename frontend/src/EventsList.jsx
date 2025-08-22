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
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <img
              src={event.image_url}
              alt={event.title}
              style={{ width: "200px", height: "100px" }}
            />

            <div>{event.title}</div>
            <div>{event.description}</div>
            <div>{event.price}$</div>
            <div>{event.location}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
