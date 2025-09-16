//for delete and edit buttons
import { useState } from "react";
import API from "../api";
import "../style/style.css";

export default function Button({ event, setEvents, status: isDeleting }) {
  const [status, setStatus] = useState(isDeleting);

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this event?")) {
      API.delete(`/plan/delete/${event.id}/`)
        .then(() => {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== event.id)
          );
          alert("Plan deleted successfully!");
          window.location.href = "/";
          setStatus(false);
        })
        .catch((err) => {
          console.error("Error deleting plan:", err);
          alert("Failed to delete plan. Please try again.");
        });
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    window.location.href = `/plan/${event.id}/edit`;
    setStatus(false);
  };

  return (
    <>
      {status && (
        <div>
          <button
            className="btn btn-danger my-button"
            onClick={handleDelete}
            title="Delete Event"
          >
            Delete
          </button>
        </div>
      )}
      {!status && (
        <div>
          <button
            className="btn btn-primary my-button"
            title="Edit Plan"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}
