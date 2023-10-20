import { activities } from "../data/content";
import { ActivityCard } from "../components/activities/ActivityCard";

export const Activities = () => {
  return (
    <div className="activities-root">
      <h1 className="activities-title">Activities</h1>
      <div className="activities-content">
        {activities.map((activity) => {
          return <ActivityCard activity={activity} />;
        })}
      </div>
    </div>
  );
};
