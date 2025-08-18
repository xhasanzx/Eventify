import { useState } from 'react'
import React from 'react'



function App() {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    categories: '',
    image: '',
    price: 0
  })

  return (
    <div>
      <h3>New Event</h3>
      <form>
        <label htmlFor="eventName">Event Name:</label>
        <input type="text" placeholder="Event Name" />
        <br></br>
        <label htmlFor="eventDescription">Event Description:</label>
        <input type="text" placeholder="Event Description" />
        <br></br>
        <label htmlFor="eventDate">Event Date:</label>
        <input type="date" placeholder="Event Date" />
        <br></br>
        <label htmlFor="eventLocation">Event Location:</label>
        <input type="text" placeholder="Event Location" />
        <br></br>
        <label htmlFor="eventCategories">Event Categories:</label>
        <input type='text' placeholder='categories' />
        <br></br>
        <label htmlFor="eventImage">Event Image URL:</label>
        <input type="text" placeholder="Event Image URL" />
        <br></br>
        <label htmlFor="eventPrice">Event Price:</label>
        <input type="text" placeholder="Event Price" />
        <br></br>
        <button type="submit" >Create Event</button>
      </form>

      <h3>Current Events</h3>
      {/* This is where the list of events will be displayed */}
    </div>
  )
}

export default App
