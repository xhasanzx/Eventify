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
        <div className="friends-plans-container">
          {plans && plans.length > 0 ? (
            plans.map((friendData) => (
              <div key={friendData.id} className="friend-plan-section">
                <h3 className="friend-plan-title">
                  {friendData.username[0].toUpperCase() +
                    friendData.username.slice(1)}
                  's Plans
                </h3>
                <CardsContainers
                  plans={friendData.plans || []}
                  isHome={false}
                  noDataMessage={`${friendData.username} has no plans yet.`}
                />
              </div>
            ))
          ) : (
            <p
              style={{
                fontSize: "var(--font-size-medium)",
                color: "var(--text-dark)",
                textAlign: "center",
              }}
            >
              Friends have no plans yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
