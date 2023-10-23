import { RandomQuote } from "../pages/activities/RandomQuote";
import { MagicSquares } from "../pages/games/MagicSquares";
import {Wordle} from "../pages/games/Wordle"
import { TicTacToe } from "../pages/games/TicTacToe";
import {FortuneCard} from "../pages/activities/FotuneCard";
import {SearchWord} from "../pages/activities/getDefinition";
import numberblocs from "../assets/numberblocks.png"
import Wordlejpg from "../assets/Wordlejpg.png"

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
        icon: "https://aws.astrotalk.com/assets/images/wheel_of_fortune.webp" ,
        urlTerm: "get-your-fortune",
        element: <FortuneCard />
    },
    {
        title: "Search Words",
        description: "Get any definition",
        icon: "https://www.i2symbol.com/pictures/emojis/f/2/0/4/f2042fedcbc0cdaee2967c4449b62845.png" ,
        urlTerm: "search-any-word",
        element: <SearchWord />
    }
];

export const games = [
    {
        urlTerm: "magicsquares",
        title: "Magic Squares",
        description: "Magic Squares > contribution by y-ashaswini :)",
        icon: numberblocs,
        element: <MagicSquares />,
    },
    {
        title: "Tic-Tac-Toe",
        description: "Lets beat opponent's ass in TicTacToe",
        icon: "https://cdn-icons-png.flaticon.com/512/2076/2076261.png",
        urlTerm: "tic-tac-toe",
        element: <TicTacToe />,
    },
    {
        urlTerm:"Wordle",
        title:"Wordle",
        description:"The same wordle but you get infinite tries",
        icon:Wordlejpg,
        element:<Wordle/>
        
    }
];

