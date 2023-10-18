import {Link} from "react-router-dom";
import "../../styles/components/activities/ActivityCard.css"

export const ActivityCard = ({activity}) => {
    return (
        <Link className="activity-card-root" to={`/activities/${activity.urlTerm}`}>
            <img src={activity.icon} alt={activity.title} />
            <h1 className="activity-card-title">{activity.title}</h1>
            <div className="activity-card-desc">{activity.description}</div>
        </Link>
    )
}