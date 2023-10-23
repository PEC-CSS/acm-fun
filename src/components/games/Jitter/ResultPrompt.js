import React, { useState, useEffect } from 'react';

import goblinSound from '../../../assets/games/jitter/goblinSound.mp3';
import otherSound from '../../../assets/games/jitter/otherSound.mp3';
import star1Sound from '../../../assets/games/jitter/star1Sound.mp3';
import star2Sound from '../../../assets/games/jitter/star2Sound.mp3';
import star3Sound from '../../../assets/games/jitter/star3Sound.mp3';
import star4Sound from '../../../assets/games/jitter/star4Sound.mp3';


const ResultPrompt = ({ clicks, chosenTime, score, onClose }) => {
  const [playSound, setPlaySound] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scoreRulebook = {
    5: [0, 7, 20, 30, 40],  // Modified score requirements for 5 seconds
    10: [0, 15, 30, 45, 60], // Modified score requirements for 10 seconds
    30: [0, 40, 80, 120, 160], // Modified score requirements for 30 seconds
  };
  

  const calculateStars = (score, chosenTime) => {
    const clickRanges = scoreRulebook[chosenTime];
    if (!clickRanges) {
      return 0; // Default to zero stars if no rule found
    }

    for (let i = 1; i <= 5; i++) {
      if (score >= clickRanges[i - 1] && score <= clickRanges[i]) {
        return i;
      }
    }

    return 5;
  };

  const calculateTitle = (filledStars) => {
    const titles = [
      {
        title: "A GOBLIN 🧌!",
        line: "You've got potential.",
      },
      {
        title: "A WITCH 🧙🏻‍♀️!",
        line: "You're brewing up some clicks.",
      },
      {
        title: "A BARBARIAN 💪🏼!",
        line: "You're getting strong.",
      },
      {
        title: "A BOWLER 🎳!",
        line: "You're rolling in clicks.",
      },
      {
        title: "A P.E.K.K.A! 🦾",
        line: "You're a clicking machine.",
      },
      {
        title: "A MEGA KNIGHT ⚔️!",
        line: "You're the king of clicks.",
      },
    ];

    return titles[filledStars];
  };

  const filledStars = calculateStars(score, chosenTime);
  const { title, line } = calculateTitle(filledStars);

  const getStarSound = (filledStars) => {
    switch (filledStars) {
      case 1:
        return star1Sound;
      case 2:
        return star2Sound;
      case 3:
        return star3Sound;
      case 4:
        return star4Sound;
      case 5:
        return otherSound;
      default:
        return goblinSound; // Default sound for zero stars
    }
  };

  useEffect(() => {
    if (playSound) {
      const sound = getStarSound(filledStars);
      const audio = new Audio(sound);
      audio.play();
      setPlaySound(false);

      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [playSound, filledStars]);

  const renderStars = (filled, empty) => {
    const stars = [];
    for (let i = 0; i < filled; i++) {
      stars.push('★');
    }
    for (let i = 0; i < empty; i++) {
      stars.push('☆');
    }
    return stars.join('');
  };
  console.log("filledStars:", filledStars);
  console.log("title:", title);
  console.log("line:", line);

  return (
    <div className={`result-prompt ${isVisible ? 'visible' : ''}`}>
      <span className="close-button" onClick={onClose}>
        &#10006;
      </span>
      <h4 className='score'>🚀CHECK YOUR SCORE</h4>
      <h1 className='title1'>{title}</h1>
      <h6 className='line1'>{line}</h6>
      <p className='clicks'>Clicks: {clicks}</p>
      <p>Time: {chosenTime} seconds</p>
      <p className='stars'>STARS: {renderStars(filledStars, 5 - filledStars)}</p>
    
    </div>
  );
};

export default ResultPrompt;
