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
      style={{
        margin: "0 auto 0 auto",
        width: "100%",
        maxWidth: "1400px",
        height: "100%",
      }}
    >
      {event ? (
        <EditPlanForm event={event} />
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
}
