import AddPlanForm from "../components/AddPlanForm";
import MyPlans from "../components/MyPlans";

export default function MyPlansPage({
  userEvents,
  setUserEvents,
  newEvent,
  setNewEvent,
}) {
  return (
    <>
      <MyPlans
        events={userEvents ? userEvents : []}
        setEvents={setUserEvents}
      />
      <AddPlanForm
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        setEvents={setUserEvents}
      />
    </>
  );
}
