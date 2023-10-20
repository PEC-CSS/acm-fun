import { RandomQuote } from "../pages/activities/RandomQuote";
import { MagicSquares } from "../pages/games/MagicSquares";
import { TicTacToe } from "../pages/games/TicTacToe";

export const activities = [
  {
    title: "Random quotes",
    description: "Get random quotes",
    icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
    urlTerm: "random-quotes",
    element: <RandomQuote />,
  },
];

export const games = [
  {
    urlTerm: "magicsquares",
    title: "Magic Squares",
    description: "Magic Squares > contribution by y-ashaswini :)",
    icon: "https://cdn-icons-png.flaticon.com/512/2076/2076261.png",
    element: <MagicSquares />,
  },
  {
    title: "Tic-Tac-Toe",
    description: "Lets beat opponent's ass in TicTacToe",
    icon: "https://cdn-icons-png.flaticon.com/512/2076/2076261.png",
    urlTerm: "tic-tac-toe",
    element: <TicTacToe />,
  },
];
