import React, { useState, useEffect } from 'react';
import "../../styles/pages/games/Jitter.css";
import clickSound from '../../assets/games/jitter/clicksound.wav';
import ResultPrompt from '../../components/games/Jitter/ResultPrompt';

export const Jitter = () => {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [timerOptions] = useState([5, 10, 30]);
  const [userSelectedTime, setUserSelectedTime] = useState(10); // User-selected time
  const [timeLeft, setTimeLeft] = useState(10); // Time left (initially equal to user-selected time)
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [ripples, setRipples] = useState([]);
  const audio = new Audio(clickSound);
  const containerRef = React.createRef();

  useEffect(() => {
    let interval;

    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Decrement timeLeft
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleGameComplete();
      setClicks((prevClicks) => prevClicks + 1); // Increment clicks when the timer runs off
    }

    return () => clearInterval(interval);
  }, [isGameActive, timeLeft]);

  const handleClick = (event) => {
    if (!isGameActive) {
      setScore(0);
      setClicks(0);
      setIsGameActive(true);
      containerRef.current.style.animationPlayState = 'running';
      setTimeLeft(userSelectedTime); // Set timeLeft to the user-selected time
    } else if (isGameActive && timeLeft > 0) {
      setScore((prevScore) => prevScore + 1);
      setClicks((prevClicks) => prevClicks + 1);
      audio.play();
    }

    const newRipple = {
      top: `${event.clientY - event.target.offsetTop}px`,
      left: `${event.clientX - event.target.offsetLeft}px`,
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 1000);
  };

  const handleRestartGame = () => {
    setScore(0);
    setClicks(0);
    setIsGameActive(false);
    setIsGameComplete(false);
    containerRef.current.style.animationPlayState = 'paused';
    setTimeLeft(userSelectedTime); // Reset timeLeft to the user-selected time
  };

  const handleGameComplete = () => {
    setIsGameComplete(true);
    containerRef.current.style.animationPlayState = 'paused';
  };

  console.log("time1:", userSelectedTime);

  const starTable = [
    { stars: 0, title: 'A GOBLIN 🧌!', description: "You've got potential." },
    { stars: 1, title: 'A WITCH 🧙🏻‍♀️!', description: "You're brewing up some clicks." },
    { stars: 2, title: 'A BARBARIAN 💪🏼!', description: "You're getting strong." },
    { stars: 3, title: 'A BOWLER 🎳!', description: "You're rolling in clicks." },
    { stars: 4, title: 'A P.E.K.K.A! 🦾', description: "You're a clicking machine." },
    { stars: 5, title: 'A MEGA KNIGHT ⚔️!', description: "You're the king of clicks." },
  ];

  return (
    <div className='sun'>
    <div className="jitter-click-game">
      <h1 className='title-game'>JITTER CLICK GAME</h1>
      <h6 className="sub">Boink the button desperately before the timer ends..</h6>
      <div className="game-container">
        <div className="left-panel">
          <p className='box'>{clicks}</p>
          <p className='box2'>Time: {timeLeft}</p> {/* Display timeLeft */}
        </div>
        <div className="center-panel">
          {isGameComplete && (
            <ResultPrompt
              clicks={clicks}
              chosenTime={userSelectedTime} // Pass user-selected time
              score={score}
              onClose={() => {
                setIsGameComplete(false);
                handleRestartGame();
              }}
            />
          )}
          <div className="click-button-container" ref={containerRef}>
            <button
              onClick={handleClick}
              className={`click-button ${isGameActive ? 'active' : ''}`}
            >
              boink me
            </button>
          </div>
        </div>
        <div className="right-panel">
          {timeLeft === 0 ? (
            <button onClick={handleRestartGame} className="restart-button">
              Try Again
            </button>
          ) : (
            <div className="timer-options">
              <p></p>
              {timerOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    if (!isGameActive) {
                      setUserSelectedTime(option); // Update the user-selected time
                   // Update timeLeft to match the new user-selected time
                    }
                  }}
                  className={`timer-option-button ${
                    userSelectedTime === option ? 'selected' : ''
                  }`}
                  disabled={isGameActive}
                >
                  {option} s
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
     
    </div>
    <div>
    <table className="star-table">
        <thead>
          <tr>
            <th>STARS</th>
            <th>TITLE</th>
     
          </tr>
        </thead>
        <tbody>
          {starTable.map((starInfo) => (
            <tr key={starInfo.stars}>
              <td>{starInfo.stars}</td>
              <td>{starInfo.title}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}


