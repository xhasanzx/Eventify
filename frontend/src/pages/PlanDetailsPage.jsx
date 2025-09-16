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
        maxWidth: "1400px",
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
              marginBottom: "24px",
              width: "100%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            src={event?.image_url}
          />
        </div>
      )}

      <div
        className={`col-md-${event?.image_url ? "5" : "12"}`}
        style={{
          fontSize: "1.2rem",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        <h3 className="col-12" style={{ fontSize: "2.2rem" }}>
          {event?.description}
        </h3>
        <p className="col-12" style={{ fontSize: "1.25rem" }}>
          {event?.location} | {event?.date.split("T")[0]}
        </p>

        {event?.is_host && (
          <div
            className="col-12 mb-2"
            style={{
              gap: "10px",
            }}
          >
            <div className="row">
              <div className="col-6 ">
                <DeletePlanButton event={event} setEvents={setEvents} />
              </div>

              <div className="col-6 ">
                <EditPlanButton event={event} />
              </div>
            </div>
          </div>
        )}

        {event?.attendees > 0 && (
          <p className="mb-2"> Attendees: {event?.attendees}</p>
        )}
      </div>
    </div>
  );
}
