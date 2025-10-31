// RandomQuote wrapper is used instead of original to provide favorite/save UI
import { RandomQuoteWithFav } from "../pages/activities_wrappers/RandomQuoteWithFav";
import { MagicSquares } from "../pages/games/MagicSquares";
import { TicTacToe } from "../pages/games/TicTacToe";
import { Wordle } from "../pages/games/Wordle";
import { GuessTheFlag } from "../pages/games/GuessFlag";
import { FortuneCard } from "../pages/activities/FotuneCard";
import { SearchWord } from "../pages/activities/getDefinition";
import { Jitter } from "../pages/games/Jitter";
import { RandomMeme } from "../pages/activities/RandomMemes";
import { WordScramble } from "../pages/games/WordScramble";
// Use wrapper components that include favorite button functionality
import { RandomJokeWithFav } from "../pages/activities_wrappers/RandomJokeWithFav";
import { RandomAnimeQuoteWithFav } from "../pages/activities_wrappers/RandomAnimeQuoteWithFav";
import { SimonSays } from "../pages/games/SimonSays";
import { ReactionTime } from "../pages/games/ReactionTime";
import MemeCaptionMaker from "../pages/games/MemeCaptionMaker";
import meme from "../assets/activities/meme.jpg";
import dog from "../assets/activities/dogimage.jpeg";
import cat from "../assets/activities/cat.jpg";
import numberblocs from "../assets/numberblocks.png";
import wordleicon from "../assets/games/Wordle/wordlejpg.png";
import flagger from "../assets/games/flag guess/flagger.png";
import Calculator from "../pages/activities/Calculator";
import GKQuiz from "../pages/games/Gk_quiz"
import { DogHttpCode } from "../pages/activities/DogHttpCode";
import { CatHttpCode } from "../pages/activities/CatHttpCode";
import  FlappyBird  from "../pages/games/FlappyBird";
import RandomIdentity from "../pages/activities/RandomIdentity";
import word_scramble_icon from "../assets/games/WordScramble/word_scramble.png";
import DontClickBomb from "../pages/games/DontClickBomb";
import TypingTest from "../pages/games/TypingTest";

export const activities = [
  {
    title: "Random quotes",
    description: "Get random quotes",
    icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
    urlTerm: "random-quotes",
    element: <RandomQuoteWithFav />,
  },
  {
    title: "Random Anime Quotes",
    description: "Get random anime quotes",
    icon: "https://64.media.tumblr.com/7b526ba246f48e294ebc87fe2cbd8e1b/1a4bdb8275a18adc-c7/s250x400/94d6c7e70601111ba79b8801cd939694d0000018.jpg",
    urlTerm: "random-anime-quotes",
    element: <RandomAnimeQuoteWithFav />,
  },
  {
    title: "Random memes",
    description: "Get random meme",
    icon: meme,
    urlTerm: "random-memes",
    element: <RandomMeme />,
  },
  {
    title: "Fortune Card",
    description: "Get your fortune",
    icon: "https://aws.astrotalk.com/assets/images/wheel_of_fortune.webp",
    urlTerm: "get-your-fortune",
    element: <FortuneCard />,
  },
  {
    title: "Search Words",
    description: "Get any definition",
    icon: "https://www.i2symbol.com/pictures/emojis/f/2/0/4/f2042fedcbc0cdaee2967c4449b62845.png",
    urlTerm: "search-any-word",
    element: <SearchWord />,
  },
  {
    title: "Random Jokes",
    description: "Get random jokes",
    icon: "https://www.troublefreepool.com/media/joke-png.127455/full",
    urlTerm: "random-jokes",
    element: <RandomJokeWithFav />,
  },
  {
    title: "Calculator",
    description: "A Simple Calculator",
    icon: "https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/512/Calculator_512.png",
    urlTerm: "calculator",
    element: <Calculator />,
  },
  {
    title: "Dog Http Status Code",
    description: "Get random dog images or meme",
    icon: dog,
    urlTerm: "dog-http-status",
    element: <DogHttpCode />,
  },
  {
    title: "Cat Http Status Code",
    description: "Get random cat images or meme",
    icon: cat,
    urlTerm: "cat-http-status",
    element: <CatHttpCode />,
  },
  {
    title: "Zodiac Sign",
    description:"Get to know your zodiac sign",
    icon:"https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2a/51/52/2a5152df-66f0-fc94-6e5e-251d3b2d6ef8/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png",
    urlTerm:"zodiac-sign",
    element:<RandomIdentity/>
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
    description: "Lets beat opponent in TicTacToe",
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
    title: "Wordle Game",
    description: "The normal wordle but you can play as much as you want",
    icon: wordleicon,
    urlTerm: "Wordle",
    element: <Wordle />,
  },
  {
    title: "Guess The Flag",
    description: "Learn geography in fun way",
    icon: flagger,
    urlTerm: "GuessTheFlag",
    element: <GuessTheFlag />,
  },
  {
    title: "Simon Says",
    description: "Memory game - repeat the color sequence!",
    icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    urlTerm: "simon-says",
    element: <SimonSays />,
  },
  {
    title: "Reaction Time Test",
    description: "Test your reflexes - click as fast as you can!",
    icon: "https://cdn-icons-png.flaticon.com/512/2972/2972554.png",
    urlTerm: "reaction-time",
    element: <ReactionTime />,
  },
  {
    title: "Meme Caption Maker",
    description: "Create hilarious memes with custom captions",
    icon: "https://cdn-icons-png.flaticon.com/512/2584/2584606.png",
    urlTerm: "meme-caption-maker",
    element: <MemeCaptionMaker />,
  },
  {
    title: "GK Quiz",
    description:"Test your general knowledge with some cool questions",
    icon: "https://play-lh.googleusercontent.com/5PyR8hatywCKFQV4wFfsvyK97UrgSn5S1SQILV7zs7rBP5p9VhMEIyjfp_Vdybjk8Qc",
    urlTerm:"Gk Quiz",
    element:<GKQuiz/>,
  },
  {
    title: "Flappy Bird",
    description: "Fly the bird and avoid obstacles!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSap9rEhSD7ghcjTSYN6HuXx0wejnzigvKncg&s",
    urlTerm: "FlappyBird",
    element: <FlappyBird />,
  },
  {
    title: "Word Scramble",
    description: "Word chaos! Can you fix it?",
    icon: word_scramble_icon,
    urlTerm: "WordScramble",
    element: <WordScramble />,
  },
  {
   title: "Don't Click the Bomb",
    description: "Click everything except 💣. Gets harder every round.",
    icon: "https://img.freepik.com/free-vector/round-black-bomb-realistic-style_52683-15190.jpg?semt=ais_hybrid&w=740&q=80",
    urlTerm: "dont-click-the-bomb",
    element: <DontClickBomb />,
    title: "Typing Test",
    description: "Test your typing skills",
    icon :"https://typingmentor.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fbs3wcomf%2Fproduction%2F9f626374aa1c388a6418a077990771aff53d054f-1200x800.jpg%3Frect%3D0%2C35%2C1200%2C731%26w%3D808%26h%3D492%26fit%3Dcrop%26auto%3Dformat&w=1920&q=75",
    urlTerm:"TypingTest",
    element:<TypingTest/>,

  }
];