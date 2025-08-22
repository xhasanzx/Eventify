import API from "./api";

export function AddEventForm({ newEvent, setNewEvent, setEvents }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/events/create/", newEvent)
      .then((res) => {
        alert("Event created!");
        setEvents((prev) => [...prev, res.data.event]);
        setNewEvent({
          title: "",
          description: "",
          date: "",
          location: "",
          image_url: "",
          price: 0,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="card"
        style={{
          marginTop: "20px",
          padding: "1.5rem",
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <h3 className="text-center mb-3">Create a new event</h3>

        <div>
          {newEvent.image_url && (
            <img
              src={newEvent.image_url}
              alt="Event preview"
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
          <div className="col-md-6">
            <label className="form-label">Name: </label>
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

          <div className="col-md-6">
            <label className="form-label">Price: </label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={newEvent.price}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-4">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
