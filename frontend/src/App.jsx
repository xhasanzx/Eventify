import { useEffect, useState } from 'react'
import React from 'react'
import API from './api'
import { AddEventForm } from './AddEventForm'
import { EventsList } from './EventsList'

function App() {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
    price: 0
  })

  return (
    <div>
      <AddEventForm newEvent={newEvent} setNewEvent={setNewEvent} setEvents={setEvents} />
      <EventsList events={events} setEvents={setEvents} />
    </div>
  )
}

export default App
