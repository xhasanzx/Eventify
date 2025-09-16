import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

import DeletePlanButton from "../components/DeletePlanButton";
import EditPlanButton from "../components/EditPlanButton";

export default function PlanDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get(`/plan/${id}`).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  return (
    <div
      className="container row"
      style={{
        backgroundColor: "#F5EFE6",
        padding: "20px",
        margin: "0 auto 0 auto",
        borderRadius: "8px",
        boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1800px",
        height: "100%",
      }}
    >
      <h1 className="text-center mb-4 col-12">{event?.title}</h1>

      {event?.image_url && (
        <div className=" col-7">
          <img
            style={{
              backgroundColor: "#DDDAD0",
              padding: "1px 1px 1px 1px",
              marginBottom: "40px",
              width: "80%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            src={event?.image_url}
          />
        </div>
      )}

      <div
        className="col-md-4"
        style={{
          fontSize: "1.2rem",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        <h3 className="" style={{ fontSize: "2rem" }}>
          {event?.description}
        </h3>
        <p className="">
          {event?.location} | {event?.date.split("T")[0]}
        </p>

        {event?.is_host && (
          <div
            className="row mb-2"
            style={{
              gap: "10px",
              width: "100%",
            }}
          >
            <DeletePlanButton
              className="col-6"
              event={event}
              setEvents={setEvents}
            />
            <EditPlanButton className="col-6" event={event} />
          </div>
        )}

        {!event?.is_host && (
            <p className="mb-2"> Host: {event?.host_username}</p>
          ) && <button className="btn btn-primary">Coming</button>}

        {event?.attendees > 0 && (
          <p className="mb-2"> Attendees: {event?.attendees}</p>
        )}
      </div>
    </div>
  );
}
