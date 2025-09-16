import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

import Button from "../components/Button";

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
    <div className="row plan-details-container">
      <h1 className="mb-4 col-12 plan-details-title">{event?.title}</h1>
      {event?.image_url && (
        <div className=" col-7">
          <img src={event?.image_url} />
        </div>
      )}

      <div className={`col-md-${event?.image_url ? "5" : "12"}`}>
        <h3 className="col-12 plan-details-description">
          {event?.description}
        </h3>

        <p className="col-12 plan-details-meta">
          {
            <span>
              {event?.location} | {event?.date.split("T")[0]}
              <br />
            </span>
          }
          {!event?.is_host && (
            <span>
              Created by: {event?.host_username}
              <br />
            </span>
          )}
          {event?.attendees > 0 && (
            <span>Number of attendees: {event?.attendees.length}</span>
          )}
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
                <Button event={event} setEvents={setEvents} isDeleting={true} />
              </div>

              <div className="col-6 ">
                <Button
                  event={event}
                  setEvents={setEvents}
                  isDeleting={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
