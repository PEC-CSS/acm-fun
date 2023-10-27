import React from 'react'
import video from '../../assets/videos/anime.mp4'
import "../../styles/components/common/HeroSection.css"
const HeroSection = () => {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay muted loop />
      <h1>Welcome to <span className="text-primary">Pec</span> Acm</h1>
      <p>Lets have some Fun!!</p>
      <div className='hero-btns'>
       
        <button type="button" className="btn btn-primary" to='/games'>Games</button>
        <button type="button" className="btn btn-light" to='/activities'>Activities</button>
      </div>
    </div>
  )
}

export default HeroSection