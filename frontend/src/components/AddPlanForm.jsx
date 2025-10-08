import API from "../api";
import { useState } from "react";

export default function AddPlanForm({ plans, setPlans }) {
  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/plan/create/", newPlan)
      .then((res) => {
        alert("Plan successfully created!");
        const createdPlan = res.data.plan;
        const next = Array.isArray(plans)
          ? [...plans, createdPlan]
          : [createdPlan];
        setPlans(next);
        setNewPlan({
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
    <div className="add-plan-form">
      <h3 className="add-plan-form-header">Create a new plan</h3>
      <div>
        {newPlan.image_url && (
          <img
            src={newPlan.image_url}
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
          <label className="form-label">Name: </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newPlan.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location: </label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={newPlan.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date: </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={newPlan.date}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={newPlan.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Image URL: </label>
          <input
            type="text"
            className="form-control"
            name="image_url"
            value={newPlan.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="button-primary">
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
}
