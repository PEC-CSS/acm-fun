import React, { useState, useEffect, useRef } from "react";
import "../../styles/pages/games/SimonSays.css";

export const SimonSays = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [message, setMessage] = useState("Press Start to Play!");

  const colors = ["red", "blue", "green", "yellow"];
  const audioContextRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play sound for each color
  const playSound = (color) => {
    if (!audioContextRef.current) return;
    
    const frequencies = {
      red: 329.63,    // E4
      blue: 261.63,   // C4
      green: 392.00,  // G4
      yellow: 440.00  // A4
    };

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = frequencies[color];
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  };

  // Flash button animation
  const flashButton = (color, duration = 500) => {
    return new Promise((resolve) => {
      setActiveButton(color);
      playSound(color);
      setTimeout(() => {
        setActiveButton(null);
        setTimeout(resolve, 200);
      }, duration);
    });
  };

  // Play the sequence
  const playSequence = async (seq) => {
    setIsUserTurn(false);
    setMessage("Watch the sequence...");
    
    for (let color of seq) {
      await flashButton(color);
    }
    
    setIsUserTurn(true);
    setMessage("Your turn! Repeat the sequence.");
  };

  // Start new game
  const startGame = () => {
    setGameOver(false);
    setLevel(1);
    setUserSequence([]);
    const newSequence = [colors[Math.floor(Math.random() * 4)]];
    setSequence(newSequence);
    setIsPlaying(true);
    playSequence(newSequence);
  };

  // Handle user button click
  const handleColorClick = async (color) => {
    if (!isUserTurn || gameOver || !isPlaying) return;

    await flashButton(color, 300);

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    // Check if the user's input matches the sequence so far
    const currentIndex = newUserSequence.length - 1;
    
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong color - game over
      setGameOver(true);
      setIsPlaying(false);
      setIsUserTurn(false);
      setMessage(`Game Over! You reached level ${level}. Press Start to try again.`);
      return;
    }

    // Check if user completed the full sequence
    if (newUserSequence.length === sequence.length) {
      // User successfully completed the sequence
      setUserSequence([]);
      setLevel(level + 1);
      setIsUserTurn(false);
      setMessage("Great! Get ready for the next level...");
      
      // Add new color to sequence after a delay
      setTimeout(() => {
        const newColor = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence, newColor];
        setSequence(newSequence);
        playSequence(newSequence);
      }, 1000);
    }
  };

  // Reset game
  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setIsPlaying(false);
    setIsUserTurn(false);
    setLevel(0);
    setGameOver(false);
    setActiveButton(null);
    setMessage("Press Start to Play!");
  };

  return (
    <div className="simon-says-container">
      <h1>Simon Says</h1>
      <div className="game-info">
        <p className="level">Level: {level}</p>
        <p className="message">{message}</p>
      </div>
      
      <div className="simon-board">
        {colors.map((color) => (
          <button
            key={color}
            className={`simon-button ${color} ${activeButton === color ? "active" : ""}`}
            onClick={() => handleColorClick(color)}
            disabled={!isUserTurn}
          />
        ))}
      </div>

      <div className="controls">
        {!isPlaying ? (
          <button className="control-btn start-btn" onClick={startGame}>
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        ) : (
          <button className="control-btn reset-btn" onClick={resetGame}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};
