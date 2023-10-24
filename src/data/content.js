import { RandomQuote } from "../pages/activities/RandomQuote";
import { MagicSquares } from "../pages/games/MagicSquares";
import { TicTacToe } from "../pages/games/TicTacToe";
import { Wordle } from "../pages/games/Wordle";
import {FortuneCard} from "../pages/activities/FotuneCard";
import {SearchWord} from "../pages/activities/getDefinition";
import {Jitter}  from "../pages/games/Jitter";
import {RandomMeme} from "../pages/activities/RandomMemes";
import meme from "../assets/activities/meme.jpg"
import numberblocs from "../assets/numberblocks.png"
import wordleicon from "../assets/games/Wordle/wordlejpg.png"

export const activities = [
    {
        title: "Random quotes",
        description: "Get random quotes",
        icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
        urlTerm: "random-quotes",
        element: <RandomQuote />
    },
    {
        title: "Random memes",
        description: "Get random meme",
        icon: meme,
        urlTerm: "random-memes",
        element: <RandomMeme />
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
        title: "Jitter Click Game",
        description: "Click as fast as possible to reach 5 stars.... lakshya",
        icon: "https://i.kym-cdn.com/entries/icons/original/000/036/070/cover5.jpg",
        urlTerm: "jitter-game",
        element: <Jitter />,
    },
    {
        title:"Wordle Game",
        description:"The normal wordle but you can play as much as you want",
        icon:wordleicon,
        urlTerm:"Wordle",
        element:<Wordle/>
    }
];

