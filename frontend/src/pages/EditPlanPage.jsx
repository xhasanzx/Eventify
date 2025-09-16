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
    <div>{event ? <EditPlanForm event={event} /> : <div>Loading...</div>}</div>
  );
}
