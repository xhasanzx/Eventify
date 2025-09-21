import CardsContainers from "../components/CardsContainers";

export default function HomePage({ userEvents, friendsEvents }) {
  return (
    <div>
      {userEvents && (
        <div className="py-4">
          <CardsContainers
            events={userEvents ? userEvents : []}
            willExpand={false}
            title="Your Plans"
            noDataMessage="You have no plans yet."
          />
        </div>
      )}

      {friendsEvents &&
        friendsEvents.map((friend) => (
          <div>
            <CardsContainers
              events={friend ? friend.plans : []}
              willExpand={false}
              title={`${friend.username}'s Plans`}
              noDataMessage={`${friend.username} has no plans yet.`}
            />
          </div>
        ))}
    </div>
  );
}
