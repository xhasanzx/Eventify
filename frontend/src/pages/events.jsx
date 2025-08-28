import EventsList from "../components/EventsList";

export default function Events({ events, setEvents }) {
  return (
    <div>    
      <div className="container py-4">
        <EventsList events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
