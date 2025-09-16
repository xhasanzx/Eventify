import CardsContainers from "../components/CardsContainers";

export default function MyPlansPage({ userEvents }) {
  return (
    <>
      <CardsContainers
        events={userEvents ? userEvents : []}
        title="Your Plans"
        noDataMessage="You have no plans yet."
      />
    </>
  );
}
