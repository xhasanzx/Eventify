import { useEffect } from "react";
import API from "../api";
import EventCard from "./EventCard";

export default function EventsList({ events, setEvents }) {
  useEffect(() => {
    API.get("/user/events/")
      .then((res) => {
        if (res.data.events) {
          setEvents(res.data.events);
        } else if (res.data.error) {
          console.log(res.data.error);
          setEvents([]);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }, [setEvents]);

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
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
