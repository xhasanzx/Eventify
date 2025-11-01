import { useEffect, useMemo, useState } from "react";
import API from "../api";
import CardsContainers from "../components/CardsContainers";

export default function DiscoverPage({ friends = [], userId }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    API.get("plan/all/")
      .then((res) => {
        if (mounted) setPlans(res.data || []);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const ordered = useMemo(() => {
    const isFriendHost = (p) =>
      friends?.includes(p.host) || friends?.includes(p.host_id);
    const notSelf = (p) => p.host !== userId && p.host_id !== userId;

    const visible = (plans || []).filter(notSelf);
    const nonFriends = visible.filter((p) => !isFriendHost(p));
    const friendsPlans = visible.filter((p) => isFriendHost(p));

    const byDateDesc = (a, b) =>
      new Date(b?.date || 0) - new Date(a?.date || 0);
    nonFriends.sort(byDateDesc);
    friendsPlans.sort(byDateDesc);

    return [...friendsPlans, ...nonFriends];
  }, [plans, friends, userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="discover-page-container">
        <p className="discover-page-title">Coming up</p>
        <CardsContainers
          plans={ordered}
          isHome={false}
          noDataMessage={"No plans to discover yet."}
        />
      </div>
      <div className="discover-page-container">
        <p className="discover-page-title">Near you</p>

        <CardsContainers
          plans={ordered}
          isHome={false}
          noDataMessage={"No plans to discover yet."}
        />
      </div>
    </>
  );
}
