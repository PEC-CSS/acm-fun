import { RandomQuote } from "../pages/activities/RandomQuote";
import { MagicSquares } from "../pages/games/MagicSquares";
import { TicTacToe } from "../pages/games/TicTacToe";
import { Wordle } from "../pages/games/Wordle";
import { GuessTheFlag } from "../pages/games/GuessFlag";
import {FortuneCard} from "../pages/activities/FotuneCard";
import {SearchWord} from "../pages/activities/getDefinition";
import {Jitter}  from "../pages/games/Jitter";
import {RandomMeme} from "../pages/activities/RandomMemes";
import { RandomJoke } from "../pages/activities/RandomJoke";
import meme from "../assets/activities/meme.jpg"
import numberblocs from "../assets/numberblocks.png"
import wordleicon from "../assets/games/Wordle/wordlejpg.png"
import flagger from "../assets/games/flag guess/flagger.png"
import Calculator from "../pages/activities/Calculator"

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
    },
    {
        title: "Random Jokes",
        description: "Get random jokes",
        icon: "https://www.troublefreepool.com/media/joke-png.127455/full",
        urlTerm: "random-jokes",
        element: <RandomJoke />
    },
    {
        title: "Calculator",
        description: "A Simple Calculator",
        icon: "https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png",
        urlTerm: "calculator",
        element: <Calculator />
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
    },
    {
        title:"Guess The Flag",
        description:"Learn geography in fun way",
        icon:flagger,
        urlTerm:"GuessTheFlag",
        element:<GuessTheFlag/>
    }
];

