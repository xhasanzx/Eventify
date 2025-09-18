import CardsContainers from "../components/CardsContainers";

export default function HomePage({ username, userEvents, friendsEvents }) {
  return (
    <div
      style={{
        margin: "0 ",
      }}
    >
      <div className="container ">
        <CardsContainers
          events={friendsEvents ? friendsEvents : []}
          title="Friends' Plans"
          noDataMessage="Your friends have no plans yet."
        />
      </div>
      <div className="container py-4">
        <CardsContainers
          events={userEvents ? userEvents : []}
          title="Your Plans"
          noDataMessage="You have no plans yet."
        />
      </div>
    </div>
  );
}
