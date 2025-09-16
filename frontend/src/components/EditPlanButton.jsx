import "../style/style.css";

export default function EditPlanButton({ event }) {
  const goToEditPlan = (e) => {
    e.preventDefault();
    window.location.href = `/plan/${event.id}/edit`;
  };

  return (
    <button
      className="btn btn-primary my-button"
      title="Edit Plan"
      onClick={goToEditPlan}
    >
      Edit
    </button>
  );
}
