import React from 'react'
import CardItem from '../../components/Home/CardItem'
import Slider from 'react-slick';
import "../../styles/pages/Home/Cards.css"
import Wordle from "../../assets/games/Wordle/wordlejpg.png"
import flagGame from "../../assets/games/flag guess/flagger.png"
import magicSquare from "../../assets/numberblocks.png"

const Cards = () => {
    // Slick settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,  // Number of cards to show at once
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='container'>
            {/* <div className='row justify-content-center'> */}
            <Slider {...settings}>
                <CardItem
                    src={Wordle}
                    text="Wordle Game"
                    label="Puzzle"
                    path='/games/Wordle'
                    title='Wordle' />
                <CardItem
                    src={"https://img.freepik.com/free-vector/detailed-click-collect-sign_52683-53160.jpg?size=626&ext=jpg"}
                    text="Jitter Click Game"
                    label="Puzzle"
                    path='/games/jitter-game'
                    title='Jitter' />
                <CardItem
                    src={magicSquare}
                    text="The Magic Squares Game"
                    label="Puzzle"
                    path='/games/magicsquares'
                    title='MagicSquare' />
                <CardItem
                    src={"https://cdn-icons-png.flaticon.com/512/2076/2076261.png"}
                    text="TicTacToe with a twist"
                    label="Puzzle"
                    path='/games/tic-tac-toe'
                    title='tic-tac-toe' />
                <CardItem
                    src={flagGame}
                    text="Learn Geography Fun Way"
                    label="Guess The Flag"
                    path='/games/GuessTheFlag'
                    title='Guess The Flag' />
                <CardItem
                    src={"https://cdn-icons-png.flaticon.com/512/2541/2541991.png"}
                    text="Get random quotes"
                    label="Random Quotes"
                    path='/activities/random-quotes'
                    title='Random Quotes' />
                <CardItem
                    src={"https://aws.astrotalk.com/assets/images/wheel_of_fortune.webp"}
                    text="Know your fortune"
                    label="Fortune Cards"
                    path='/activities/get-your-fortune'
                    title='Fortune Cards' />
                <CardItem
                    src={"https://img.freepik.com/free-photo/marketing-research-concept-with-magnifying-glass-wooden-cubes-red-table-flat-lay_176474-9480.jpg?w=826&t=st=1698234200~exp=1698234800~hmac=06d4ff5d91bc832f3c7a656d2b3a1a792a66a1eab8161ae9086e29a67599154f"}
                    text="Get any Definition"
                    label="Search Words"
                    path='/activities/search-any-word'
                    title='Search Words' />
            </Slider>
            {/* </div> */}
        </div>
    )
}

export default Cards