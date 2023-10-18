import {games} from "../data/content.js"
import {Link} from "react-router-dom";

export const Games = () => {
    return (
        <div>
            <div>Games</div>
            <div>
                {
                    games.map(game => {
                        return (
                            <Link to={`/games/${game.urlTerm}`}>
                                {game.title}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}