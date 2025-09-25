import CardsContainers from "../components/CardsContainers";
import AddPlanForm from "../components/AddPlanForm";

export default function PlansPage({ plans, setPlans, isHost, isFriendsPage }) {
  return (
    <div className="row">
      {isHost && !isFriendsPage && (
        <div className={"col-8"}>
          <CardsContainers
            plans={plans ? plans : []}
            isHome={false}
            isUserPage={isHost}
            noDataMessage={"You have no plans yet."}
          />
        </div>
      )}

      {isHost && !isFriendsPage && (
        <div className="col-4">
          <AddPlanForm plans={plans} setPlans={setPlans} />
        </div>
      )}

      {!isHost && isFriendsPage && (
        <CardsContainers
          plans={plans ? plans : []}
          isHome={false}
          isHost={isHost}
          noDataMessage={`Friends have no plans yet.`}
        />
      )}
    </div>
  );
}
