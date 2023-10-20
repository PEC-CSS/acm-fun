// import "../styles/pages/Games.css"
import {games} from "../data/content";
import {GameCard} from "../components/games/GameCard";

export const Games = () => {
  return (
    <div className="game-root">
      <h1 className="game-title">Games</h1>
      <div className="game-content">
        {games.map((game) => {
          return <GameCard game={game} />;
        })}
      </div>
    </div>
  );
};
