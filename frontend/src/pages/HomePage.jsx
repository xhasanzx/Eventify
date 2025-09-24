import CardsContainers from "../components/CardsContainers";

export default function HomePage({ friendsPlans }) {
  return (
    <div className="row">
      <CardsContainers
        plans={friendsPlans ? friendsPlans : []}
        isHome={true}
        isHost={false}
        noDataMessage={`You have no plans yet.`}
      />
    </div>
  );
}
