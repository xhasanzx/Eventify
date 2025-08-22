import { useState } from "react";
import { AddEventForm } from "./AddEventForm";
import { EventsList } from "./EventsList";

function App() {
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
    <>
      <AddEventForm
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        setEvents={setEvents}
      />
      <EventsList events={events} setEvents={setEvents} />
    </>
  );
}

export default App;
