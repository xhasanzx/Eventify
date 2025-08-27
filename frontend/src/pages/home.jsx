import EventsList from "../components/EventsList";

export default function Home({ events, setEvents }) {
  return (
    <div>
      <div>
        <h1>Welcome to Meet Up</h1>
        <p>Discover and join friends near you.</p>
      </div>

      <div className="container py-4">
        <EventsList events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
