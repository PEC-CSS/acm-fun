import React, { useEffect, useMemo, useState } from "react";
import "../../styles/pages/games/TypingTest.css";

const SAMPLE_PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with focus and consistency.",
  "React makes it painless to create interactive user interfaces.",
  "Code slowly, read carefully, and test your changes.",
  "Practice daily to increase your speed and accuracy."
];

function getRandomParagraph() {
  const idx = Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length);
  return SAMPLE_PARAGRAPHS[idx];
}

export default function TypingTest() {
  const [targetText, setTargetText] = useState(getRandomParagraph);
  const [typedText, setTypedText] = useState("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bestWpm, setBestWpm] = useState(() => {
    const fromLS = localStorage.getItem("typing_best_wpm");
    return fromLS ? Number(fromLS) : 0;
  });

  // timer: start on first key, stop on finish
  useEffect(() => {
    let timer;
    if (started && !finished) {
      timer = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [started, finished]);

  // derived metrics
  const stats = useMemo(() => {
    const wordsTyped =
      typedText.trim().length === 0
        ? 0
        : typedText.trim().split(/\s+/).length;
    const minutes = time / 60;
    const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

    // accuracy
    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === targetText[i]) correct++;
    }
    const accuracy =
      typedText.length === 0
        ? 100
        : Math.round((correct / typedText.length) * 100);

    return { wpm, accuracy, wordsTyped };
  }, [typedText, time, targetText]);

  // when completed, stop and save best
  useEffect(() => {
    if (typedText === targetText && targetText.length > 0) {
      setFinished(true);
      setStarted(false);
      if (stats.wpm > bestWpm) {
        setBestWpm(stats.wpm);
        localStorage.setItem("typing_best_wpm", String(stats.wpm));
      }
    }
  }, [typedText, targetText, stats.wpm, bestWpm]);

  function handleChange(e) {
    const val = e.target.value;

    // auto start on first key
    if (!started && !finished) {
      setStarted(true);
    }

    // restrict to paragraph length
    if (val.length <= targetText.length) {
      setTypedText(val);

      // auto end on completion
      if (val === targetText) {
        setFinished(true);
        setStarted(false);
      }
    }
  }

  function handleRestart() {
    const nextPara = getRandomParagraph();
    setTargetText(nextPara);
    setTypedText("");
    setTime(0);
    setFinished(false);
    setStarted(false);
  }

  return (
    <div className="typing-test-container">
      <div className="typing-header">
        <h2>Typing Speed Test</h2>
        <p>Type the text below as fast and as accurately as you can.</p>
      </div>

      <div className="typing-stats">
        <div className="stat-card">
          <span className="stat-label">Time</span>
          <span className="stat-value">{time}s</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">WPM</span>
          <span className="stat-value">{stats.wpm}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{stats.accuracy}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Best WPM</span>
          <span className="stat-value">{bestWpm}</span>
        </div>
      </div>

      <div className="typing-target">
        {targetText.split("").map((ch, idx) => {
          let cls = "";
          if (idx < typedText.length) {
            cls = typedText[idx] === ch ? "correct" : "incorrect";
          }
          return (
            <span key={idx} className={cls}>
              {ch}
            </span>
          );
        })}
      </div>

      <textarea
        className="typing-input"
        value={typedText}
        onChange={handleChange}
        disabled={finished}
        placeholder="Start typing here..."
      />

      <div className="typing-actions">
        <button onClick={handleRestart} className="typing-btn">
          Restart
        </button>
        {finished && (
          <span className="typing-done">
            ✅ Paragraph completed! Final WPM: {stats.wpm}
          </span>
        )}
      </div>
    </div>
  );
}
