import MyPlans from "../components/MyPlans";

export default function MyPlansPage({
  userEvents,
  setUserEvents,
}) {
  return (
    <>
      <MyPlans
        events={userEvents ? userEvents : []}
        setEvents={setUserEvents}
      />      
    </>
  );
}
