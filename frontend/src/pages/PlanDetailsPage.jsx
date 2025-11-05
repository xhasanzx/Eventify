import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

import Button from "../components/Button";

export default function PlanDetailsPage() {
  const { id } = useParams();
  const userId = useParams().userId; // from App.jsx
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [attendeesNumber, setAttendeesNumber] = useState(
    event?.attendees?.length || 0
  );
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    API.get(`/plan/${id}`).then((res) => {
      setEvent(res.data);
      setAttendeesNumber(res.data.attendees.length);
      setAttendees(res.data.attendees);
      setIsAttending(
        res.data.attendees.some((attendee) => attendee.id === userId)
      );
    });
  }, [id]);

  const handleAttend = () => {
    API.post(`/plan/attend/${id}/`).then((res) => {
      if (res.status === 200) {
        if (isAttending) {
          setIsAttending(!isAttending);
          setAttendeesNumber(attendeesNumber - 1);
        } else if (!isAttending) {
          setIsAttending(!isAttending);
          setAttendeesNumber(attendeesNumber + 1);
        }
      } else if (res.status === 400) {
        alert("Failed to attend plan. Please try again.");
      }
    });
  };
  return (
    <div className="row plan-details-container">
      <div className="col-12">
        <p className="plan-title">{event?.title}</p>

        <div className="meta-row">
          {event?.location && (
            <span className="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              {event.location}
            </span>
          )}
          {event?.date && (
            <span className="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>
              {new Date(event.date).toLocaleDateString()}
            </span>
          )}
          {!event?.is_host && event?.host_username && (
            <Link to={`/account/${event?.host}`}>
              <span className="meta-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                {event.host_username[0].toUpperCase() +
                  event.host_username.slice(1)}
              </span>
            </Link>
          )}
          {Array.isArray(event?.attendees) && (
            <span className="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 16 16"
              >
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
              </svg>
              {attendeesNumber}
            </span>
          )}
        </div>

        <p className="plan-desc">{event?.description}</p>
      </div>
      {event?.is_host && (
        <div className="action-row">
          <div className="col-6">
            <Button event={event} setEvents={setEvents} isDeleting={true} />
          </div>
          <div className="col-6">
            <Button event={event} setEvents={setEvents} isDeleting={false} />
          </div>
        </div>
      )}

      {!event?.is_host && (
        <div className="action-row col-12">
          <button
            className="button-primary"
            style={{ marginLeft: "auto", marginRight: "auto" }}
            onClick={handleAttend}
          >
            {isAttending ? "Unattend" : "Attend"}
          </button>
        </div>
      )}
    </div>
  );
}
