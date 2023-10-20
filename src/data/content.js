import {RandomQuote} from "../pages/activities/RandomQuote";
import {FortuneCard} from "../pages/activities/FortuneCard";
import {TicTacToe} from "../pages/games/TicTacToe";



export const activities = [
    {
        title: "Random quotes",
        description: "Get random quotes",
        icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
        urlTerm: "random-quotes",
        element: <RandomQuote />
    },
    {
        title: "Fortune Card",
        description: "Get your fortune",
        icon: "https://ibb.co/mbBdVQK" ,
        urlTerm: "get-your-fortune",
        element: <FortuneCard />
    }
]

export const games = [
    {
        title: "Tic-Tac-Toe",
        description: "Lets beat opponent's ass in TicTacToe",
        icon: "https://cdn-icons-png.flaticon.com/512/2076/2076261.png",
        urlTerm: "tic-tac-toe",
        element: <TicTacToe />
    }
]