import CardsContainers from "../components/CardsContainers";

export default function HomePage({ friendsPlans }) {
  // Handle both grouped (array of objects with plans property) and flat arrays
  let flatPlans = [];
  
  if (friendsPlans && friendsPlans.length > 0) {
    // Check if first item has a 'plans' property to determine if it's grouped
    if (friendsPlans[0] && friendsPlans[0].plans) {
      flatPlans = friendsPlans.flatMap((item) => item.plans || []);
    } else {
      // Already a flat array
      flatPlans = friendsPlans;
    }
  }
  
  console.log("HomePage friendsPlans:", friendsPlans);
  console.log("HomePage flatPlans:", flatPlans);

  return (
    <div className="row">
      <CardsContainers
        plans={flatPlans}
        isHome={true}
        isHost={false}
        noDataMessage={`You have no plans yet.`}
      />
    </div>
  );
}
