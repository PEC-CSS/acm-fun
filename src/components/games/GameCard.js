import {Link} from "react-router-dom";
import "../../styles/components/games/GameCard.css"

export const GameCard = ({game}) => {
    return (
        <Link className="game-card-root" to={`/games/${game.urlTerm}`}>
            <img src={game.icon} alt={game.title} />
            <h1 className="game-card-title">{game.title}</h1>
            <div className="game-card-desc">{game.description}</div>
        </Link>
    )
}