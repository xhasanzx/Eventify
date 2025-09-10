import AddPlanForm from "../components/AddPlanForm";
import UserPlans from "../components/UserPlans";

export default function MyPlans({
  userEvents,
  setUserEvents,
  newEvent,
  setNewEvent,
}) {
  return (
    <div>
      <AddPlanForm
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        setEvents={setUserEvents}
      />
      <UserPlans events={userEvents} setEvents={setUserEvents} />
    </div>
  );
}
