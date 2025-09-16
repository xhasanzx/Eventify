import API from "../api";
import { useState } from "react";

export default function EditPlanForm({ event }) {
  const [updatedEvent, setUpdatedEvent] = useState({
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    image_url: event.image_url,
    is_active: event.is_active,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    API.put(`/plan/update/${event.id}/`, updatedEvent)
      .then(() => {
        alert("Plan Updated Successfully");
        window.location.href = `/plan/${event.id}`;        
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };
  return (
    <>
      <div>
        <h1>Edit Plan</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={updatedEvent?.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={updatedEvent?.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={updatedEvent?.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="date"
            value={updatedEvent?.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image_url"
            value={updatedEvent?.image_url}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            name="is_active"
            checked={updatedEvent?.is_active}
            value={updatedEvent?.is_active}
            onChange={handleChange}
          />
          <label htmlFor="is_active">Is Active</label>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
