import React from 'react'
import video from '../../assets/videos/anime.mp4'
import "../../styles/components/common/HeroSection.css"
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay muted loop />
      <h1>Welcome to <span className="text-primary">Pec</span> Acm</h1>
      <p>Lets have some Fun!!</p>
      <div className='hero-btns'>
        <Link to='/games'> {/* Link to the '/games' route */}
          <button type="button" className="btn btn-primary">Games</button>
        </Link>
        <Link to='/activities'> {/* Link to the '/activities' route */}
          <button type="button" className="btn btn-light">Activities</button>
        </Link>      </div>
    </div>
  )
}

export default HeroSection