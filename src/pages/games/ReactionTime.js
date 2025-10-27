import React, { useState, useEffect, useRef } from 'react';
import "../../styles/pages/games/ReactionTime.css";

export const ReactionTime = () => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, result
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [message, setMessage] = useState('Click to Start');
  const [stats, setStats] = useState({ average: 0, fastest: 0, slowest: 0 });
  const [tooEarly, setTooEarly] = useState(false);
  
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reactionTimes.length > 0) {
      const avg = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
      const fastest = Math.min(...reactionTimes);
      const slowest = Math.max(...reactionTimes);
      setStats({
        average: Math.round(avg),
        fastest: fastest,
        slowest: slowest
      });
    }
  }, [reactionTimes]);

  const startGame = () => {
    if (gameState === 'waiting' || gameState === 'ready') return;
    
    setTooEarly(false);
    setGameState('waiting');
    setMessage('Wait for green...');
    setCurrentAttempt(null);
    
    // Random delay between 1000ms and 5000ms
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('CLICK NOW!');
      startTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === 'idle' || gameState === 'result') {
      startGame();
    } else if (gameState === 'waiting') {
      // Clicked too early
      clearTimeout(timeoutRef.current);
      setGameState('result');
      setMessage('Too early! Click to try again');
      setTooEarly(true);
      setCurrentAttempt(null);
    } else if (gameState === 'ready') {
      // Calculate reaction time
      const reactionTime = Date.now() - startTimeRef.current;
      setCurrentAttempt(reactionTime);
      setReactionTimes([...reactionTimes, reactionTime]);
      setGameState('result');
      setMessage(`${reactionTime}ms - Click to try again`);
      setTooEarly(false);
    }
  };

  const resetStats = () => {
    setReactionTimes([]);
    setStats({ average: 0, fastest: 0, slowest: 0 });
    setGameState('idle');
    setMessage('Click to Start');
    setCurrentAttempt(null);
    setTooEarly(false);
  };

  const getPerformanceRating = (time) => {
    if (time < 200) return { text: 'Lightning Fast!', color: '#FFD700' };
    if (time < 250) return { text: 'Excellent!', color: '#00ff41' };
    if (time < 300) return { text: 'Great!', color: '#00d4ff' };
    if (time < 400) return { text: 'Good!', color: '#7fff00' };
    if (time < 500) return {text: 'Not bad!', color: '#ffaa00' };
    return { text: 'Keep trying!', color: '#ff6b6b' };
  };

  const getStateClass = () => {
    if (gameState === 'waiting') return 'waiting';
    if (gameState === 'ready') return 'ready';
    if (tooEarly) return 'too-early';
    return '';
  };

  return (
    <div className="reaction-time-container">
      <div className="reaction-header">
        <h1 className="reaction-title">⚡ Reaction Time Test</h1>
        <p className="reaction-subtitle">Test how fast your reflexes are!</p>
      </div>

      <div className={`reaction-game-area ${getStateClass()}`} onClick={handleClick}>
        <div className="reaction-message">
          <span className="message-text">{message}</span>
          {currentAttempt && !tooEarly && (
            <div className="performance-badge" style={{ color: getPerformanceRating(currentAttempt).color }}>
              <span className="badge-emoji">{getPerformanceRating(currentAttempt).emoji}</span>
              <span className="badge-text">{getPerformanceRating(currentAttempt).text}</span>
            </div>
          )}
          {tooEarly && (
            <div className="too-early-message">
              <span className="error-emoji">❌</span>
              <span className="error-text">Wait for the green screen!</span>
            </div>
          )}
        </div>
        
        {gameState === 'waiting' && (
          <div className="pulse-indicator">
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
          </div>
        )}
      </div>

      <div className="reaction-instructions">
        <p>
          {gameState === 'idle' && '👆 Click the box above to start'}
          {gameState === 'waiting' && '⏳ Wait for the screen to turn green'}
          {gameState === 'ready' && '🎯 Click as fast as you can!'}
          {gameState === 'result' && '🔄 Click to try again'}
        </p>
      </div>

      {reactionTimes.length > 0 && (
        <div className="reaction-stats">
          <h2 className="stats-title">📊 Your Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-label">Attempts</div>
              <div className="stat-value">{reactionTimes.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-label">Average</div>
              <div className="stat-value">{stats.average}ms</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-icon">🏆</div>
              <div className="stat-label">Fastest</div>
              <div className="stat-value">{stats.fastest}ms</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🐢</div>
              <div className="stat-label">Slowest</div>
              <div className="stat-value">{stats.slowest}ms</div>
            </div>
          </div>

          <div className="attempts-history">
            <h3 className="history-title">Recent Attempts</h3>
            <div className="attempts-list">
              {reactionTimes.slice().reverse().map((time, index) => {
                const rating = getPerformanceRating(time);
                return (
                  <div key={index} className="attempt-item">
                    <span className="attempt-number">#{reactionTimes.length - index}</span>
                    <span className="attempt-time">{time}ms</span>
                    <span className="attempt-rating" style={{ color: rating.color }}>
                      {rating.emoji} {rating.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="reset-button" onClick={resetStats}>
            🔄 Reset Statistics
          </button>
        </div>
      )}

      <div className="reaction-info">
        <h3 className="info-title">💡 How It Works</h3>
        <ul className="info-list">
          <li>Click the box to start the test</li>
          <li>Wait for the screen to turn <strong>green</strong></li>
          <li>Click as fast as you can when it turns green</li>
          <li>Try multiple times to improve your average!</li>
          <li>Don't click too early or you'll have to start over</li>
        </ul>
      </div>
    </div>
  );
};

