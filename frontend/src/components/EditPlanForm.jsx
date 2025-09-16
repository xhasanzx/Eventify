import API from "../api";
import { useState } from "react";

export default function EditPlanForm({ event: prevEvent }) {
  const [updatedEvent, setUpdatedEvent] = useState({
    id: prevEvent.id,
    title: prevEvent.title,
    description: prevEvent.description,
    location: prevEvent.location,
    date: prevEvent.date,
    image_url: prevEvent.image_url,
    is_active: prevEvent.is_active,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    API.put(`/plan/update/${prevEvent.id}/`, updatedEvent)
      .then(() => {
        alert("Plan Updated Successfully");
        window.location.href = `/plan/${prevEvent.id}`;
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUpdatedEvent({
      ...updatedEvent,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  return (
    <>
      <div className=" mb-4 row">
        <div className="col-7">
          {prevEvent.image_url && (
            <img
              style={{
                backgroundColor: "#DDDAD0",
                padding: "1px 1px 1px 1px",
                marginBottom: "40px",
                marginRight: "10px",
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              src={updatedEvent.image_url || "https://placehold.co/600x400"}
            />
          )}
        </div>

        <div className="col-5">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label" style={{ fontSize: "1.05rem" }}>
                Name:{" "}
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="title"
                value={updatedEvent?.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" style={{ fontSize: "1.05rem" }}>
                Location:{" "}
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="location"
                value={updatedEvent?.location}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <label className="form-label" style={{ fontSize: "1.05rem" }}>
                Date:{" "}
              </label>
              <input
                type="date"
                className="form-control form-control-lg"
                name="date"
                value={updatedEvent?.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label" style={{ fontSize: "1.05rem" }}>
                Image:{" "}
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="image_url"
                value={updatedEvent?.image_url}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label" style={{ fontSize: "1.05rem" }}>
                Description:{" "}
              </label>
              <textarea
                className="form-control form-control-lg"
                name="description"
                value={updatedEvent?.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="col-6 d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="is_active"
                name="is_active"
                checked={!!updatedEvent?.is_active}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="is_active"
                style={{ fontSize: "1.05rem" }}
              >
                Active
              </label>
            </div>
            <button type="submit" className="col-6 btn btn-primary px-4">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
