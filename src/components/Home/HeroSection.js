import React from 'react'
import video from '../../assets/videos/anime.mp4'
import "../../styles/components/common/HeroSection.css"
import { Link as ScrollLink } from 'react-scroll';
const HeroSection = () => {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay muted loop />
      <h1>Welcome to <span className="text-primary">Pec</span> Acm</h1>
      <p>Lets have some Fun!!</p>
      <div className='hero-btns'>
        <ScrollLink
          to="games-section" 
          smooth={true}
          duration={500}
          className="btn btn-primary"
        >
          Games
        </ScrollLink>
        <ScrollLink
          to="activities-section" 
          smooth={true}
          duration={500}
          className="btn btn-light"
        >
          Activities
        </ScrollLink>
      </div>
    </div>
  )
}

export default HeroSection