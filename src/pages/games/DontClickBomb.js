import React, { useEffect, useMemo, useState } from "react";
import "../../styles/pages/games/DontClickBomb.css";

const SAFE_EMOJIS = ["😀", "😎", "😺", "🦊", "🐶", "🐻", "🍔", "🍩", "🍓", "🌸", "⭐", "💎"];

export default function DontClickBomb() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2.5); // seconds per round, will shrink
  const [tick, setTick] = useState(0); // to re-gen grid when timer refreshes

  // grid scales with level
  const gridSize = Math.min(3 + Math.floor(level / 1.3), 8); // 3..8
  const totalCells = gridSize * gridSize;

  // number of bombs grows
 const numBombs = Math.min(Math.floor(level * 0.7) + 1, 10);


  // choose unique bomb positions
  const bombIndexes = useMemo(() => {
    const set = new Set();
    while (set.size < numBombs) {
      set.add(Math.floor(Math.random() * totalCells));
    }
    return Array.from(set);
  }, [level, totalCells, numBombs, tick]);

  // timer logic: every level you get slightly less time
  useEffect(() => {
    if (gameOver) return;
    setTimeLeft(Math.max(0.9, 2.6 - level * 0.1)); // min ~0.9s
  }, [level, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          // time up -> lose
          setGameOver(true);
          return 0;
        }
        return Number((t - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  function handleCellClick(idx, isBomb) {
    if (gameOver) return;
    if (isBomb) {
      setGameOver(true);
      return;
    }
    // safe
    setScore((s) => s + 10 + level * 2);
    setLevel((l) => l + 1);
    // refresh grid
    setTick((t) => t + 1);
  }

  function handleRestart() {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setTimeLeft(2.5);
    setTick((t) => t + 1);
  }

  return (
    <div className="bomb-wrapper hard">
      <div className="bomb-header">
        <h2>Don&apos;t Click the Bomb 💣</h2>
        <p>Click any safe emoji before the timer runs out. More levels = more bombs.</p>
      </div>

      <div className="bomb-stats">
        <div className="bomb-stat">
          <span className="label">Level</span>
          <span className="value">{level}</span>
        </div>
        <div className="bomb-stat">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>
        <div className={`bomb-timer ${timeLeft < 1 ? "low" : ""}`}>
          ⏱ {timeLeft.toFixed(1)}s
        </div>
        {gameOver && (
          <div className="bomb-over">💥 Boom! Too slow / bomb clicked.</div>
        )}
      </div>

      <div
        className="bomb-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(45px, 1fr))`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, idx) => {
          const isBomb = bombIndexes.includes(idx);
          const emoji = isBomb
            ? "💣"
            : SAFE_EMOJIS[Math.floor(Math.random() * SAFE_EMOJIS.length)];

          return (
            <button
              key={idx}
              className={`bomb-cell ${isBomb ? "is-bomb" : "is-safe"} ${
                gameOver && isBomb ? "explode" : ""
              }`}
              onClick={() => handleCellClick(idx, isBomb)}
              disabled={gameOver}
            >
              {emoji}
            </button>
          );
        })}
      </div>

      <div className="bomb-actions">
        <button onClick={handleRestart} className="bomb-btn">
          {gameOver ? "Play again" : "Restart"}
        </button>
      </div>

      <p className="bomb-hint">
        From level 4: 2 bombs 🧨. From level 8: 3 bombs 😈. Timer also gets shorter.
      </p>
    </div>
  );
}
