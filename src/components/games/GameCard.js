import { Link } from "react-router-dom";
// import "../../styles/components/games/GameCard.css";
import "../../styles/components/activities/ActivityCard.css";

export const GameCard = ({ game }) => {
  return (
    <Link className="activity-card-root" to={`/games/${game.urlTerm}`}>
      <img src={game.icon} alt={game.title} />
      <h1 className="activity-card-title">{game.title}</h1>
      <div className="activity-card-desc">{game.description}</div>
    </Link>
  );
};
