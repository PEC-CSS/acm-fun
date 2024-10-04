import "../styles/pages/Games.css"
import { games } from "../data/content";
import { GameCard } from "../components/games/GameCard";

export const Games = () => {
    return (
        <div className="games-root">
            <h1 className="games-title">Games</h1>
            <div className="games-content">
                {
                    games.map((game, index) => {
                        return (
                            <section id={`game-${index}`} key={game.urlTerm} style={{ padding: '50px 0' }}>
                                <GameCard game={game} />
                            </section>
                        );
                    })
                }
            </div>
        </div>
    )
}
