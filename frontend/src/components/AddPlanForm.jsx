import API from "../api";
import { useState } from "react";

export default function AddPlanForm({ events, setEvents }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/plan/create/", newEvent)
      .then((res) => {
        alert("Plan successfully created!");
        const createdPlan = res.data.plan;
        const next = Array.isArray(events)
          ? [...events, createdPlan]
          : [createdPlan];
        setEvents(next);
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          image_url: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="card"
      style={{
        padding: "1.5rem",
        width: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <h3
        className="text-center header"
        style={{
          paddingTop: "0",
        }}
      >
        Create a new plan
      </h3>
      <div>
        {newEvent.image_url && (
          <img
            src={newEvent.image_url}
            alt="Plan preview"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label
            className="form-label"
            style={{
              paddingTop: "0",
            }}
          >
            Name:{" "}
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location: </label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date: </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Image URL: </label>
          <input
            type="text"
            className="form-control"
            name="image_url"
            value={newEvent.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn px-4"
            style={{
              backgroundColor: "#10b981",
              color: "white",
              borderRadius: "10px",
              fontWeight: 700,
              boxShadow: "0 4px 6px rgba(16,185,129,0.25)",
            }}
          >
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
}
