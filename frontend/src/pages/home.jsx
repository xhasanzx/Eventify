import EventsList from "../components/EventsList";

export default function Home({ events, setEvents }) {
  return (
    <div>
      <div className="text-center">
        <h1>Welcome to Meet Up</h1>        
      </div>
      <div className="container py-4">
        <EventsList events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}
