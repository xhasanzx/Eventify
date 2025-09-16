export default function EditPlanButton({ event }) {
  const goToEditPlan = (e) => {
    e.preventDefault();
    window.location.href = `/plan/${event.id}/edit`;
  };

  return (
    <button
      className="btn btn-primary"
      style={{
        fontSize: "0.95rem",
        padding: "8px 8px",
        borderRadius: "8px",
        width: "100%",
      }}
      title="Edit Plan"
      onClick={goToEditPlan}
    >
      Edit
    </button>
  );
}
