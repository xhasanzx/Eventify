import { useState, useEffect } from "react";
import API from "../api";
import EditPlanForm from "../components/EditPlanForm";
import { useParams } from "react-router-dom";

export default function EditPlanPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/plan/${id}/`).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#F5EFE6",
        padding: "20px",
        margin: "0 auto 0 auto",
        borderRadius: "8px",
        boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1400px",
        height: "100%",
      }}
    >
      <h1 className="text-center mb-4 col-12">Edit Plan</h1>

      {event ? (
        <EditPlanForm event={event} />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}
