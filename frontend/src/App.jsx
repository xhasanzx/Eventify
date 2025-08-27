import { useState } from "react";
import { AddEventForm } from "./components/AddEventForm";
import { EventsList } from "./components/EventsList";
import { Navbar } from "./components/navbar";

function App() {
  const user = {
    name: "admin",
  };

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
    price: 0,
  });

  return (
    <div style={{ backgroundColor: "#F9F6F7", minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-4">
        <EventsList events={events} setEvents={setEvents} />

        {user.name === "admin" && (
          <AddEventForm
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            setEvents={setEvents}
          />
        )}
      </div>
    </div>
  );
}

export default App;
