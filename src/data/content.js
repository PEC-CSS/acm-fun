import { RandomQuote } from "../pages/activities/RandomQuote";
import { MagicSquares } from "../pages/games/MagicSquares";

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
    description: "Magic Squares - contributed by y-ashaswini :)",
    icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
    element: <MagicSquares />,
  },
];
