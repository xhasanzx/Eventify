import API from "../api";
import "../style/style.css";

export default function DeletePlanButton({ event, setEvents }) {
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
        })
        .catch((err) => {
          console.error("Error deleting plan:", err);
          alert("Failed to delete plan. Please try again.");
        });
    }
  };

  return (
    <button
      className="btn btn-danger my-button"
      onClick={handleDelete}
      title="Delete Event"
    >
      Delete
    </button>
  );
}
