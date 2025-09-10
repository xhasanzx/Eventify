import AddEventForm  from "../components/AddEventForm";
import EventsList from "../components/EventsList";
import { useState } from "react";

export default function MyPlans({ events, setEvents, newEvent, setNewEvent }) {
  return (
    <div>
      <h1>My Plans</h1>
      <AddEventForm
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        setEvents={setEvents}
      />
      <EventsList events={events} setEvents={setEvents} />
    </div>
  );
}
