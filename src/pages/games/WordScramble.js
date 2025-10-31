import React, { useState, useEffect } from "react";
import "../../styles/pages/games/WordScramble.css";

export const WordScramble = () => {
  // Minimal fallback words (used if local bank fails)
  const FALLBACK_WORDS = [
    "react",
    "javascript",
    "component",
    "function",
    "frontend",
    "context",
    "state",
    "effect",
    "variable",
    "programming",
  ];

  const [words, setWords] = useState(FALLBACK_WORDS);
  const [word, setWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Press Start to Play!");
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [hintActive, setHintActive] = useState(false);

  // Fisher-Yates shuffle for letters
  const shuffleWord = (w) => {
    const a = w.split("");
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.join("");
  };

  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // how long a revealed hint letter stays visible (ms)
  const HINT_DURATION = 4000;

  // Load a local word bank (public/wordbanks/word-scramble.txt)
  const fetchLocalWordBank = async (path = "/wordbanks/word-scramble.txt") => {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Local word bank not found");
    const txt = await res.text();
    return txt
      .split(/\r?\n/)
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean);
  };

  // Optionally a simple free API fallback (may be rate-limited)
  const fetchRandomFromApi = async (number = 10) => {
    try {
      const url = `https://random-word-api.herokuapp.com/word?number=${number}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API fetch failed");
      const data = await res.json();
      return data.map((w) => String(w).toLowerCase());
    } catch (e) {
      console.warn("Random API fallback failed:", e);
      return [];
    }
  };

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        let bank = await fetchLocalWordBank();

        // Filter clean words: letters only and reasonable length
        bank = bank.filter((w) => /^[a-z]+$/.test(w) && w.length >= 4 && w.length <= 12);

        if (!bank.length) {
          // try API fallback
          const apiWords = await fetchRandomFromApi(50);
          bank = apiWords.filter((w) => /^[a-z]+$/.test(w) && w.length >= 4 && w.length <= 12);
        }

        if (mounted && bank.length) {
          setWords(bank);
          // preselect first word
          const pick = pickRandom(bank);
          setWord(pick);
          let s = shuffleWord(pick);
          if (s === pick && pick.length > 1) s = shuffleWord(pick.split("").reverse().join(""));
          setScrambledWord(s);
        }
      } catch (err) {
        console.error("Word bank load failed:", err);
        // keep fallback words
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  const startGame = () => {
    if (!words.length) return;
    const randomWord = pickRandom(words);
    let scrambled = shuffleWord(randomWord);
    if (scrambled === randomWord && randomWord.length > 1)
      scrambled = shuffleWord(randomWord.split("").reverse().join(""));

    setWord(randomWord);
    setScrambledWord(scrambled);
    setUserInput("");
    setAttempts(0);
    setRevealed(new Set());
    setShowAnswer(false);
    setScore(0);
    setIsPlaying(true);
    setGameOver(false);
    setMessage("Unscramble the word!");
  };

  const checkAnswer = () => {
    const guess = userInput.trim().toLowerCase();
    if (!guess) {
      setMessage("Please enter a guess before submitting");
      return;
    }

    if (guess === word.toLowerCase()) {
      setScore((s) => s + 1);
      setMessage("✅ Correct! Loading next word...");
      setTimeout(() => {
        nextWord();
      }, 700);
    } else {
      // wrong answer
      setAttempts((a) => a + 1);
      const newAttempts = attempts + 1;
      if (newAttempts >= 3) {
        // after 3 wrong attempts, reveal the answer briefly
        revealAnswer();
      } else {
        setMessage(`❌ Wrong! Attempts: ${newAttempts}/3`);
      }
    }
  };

  const nextWord = () => {
    if (!words.length) return;
    const randomWord = pickRandom(words);
    let scrambled = shuffleWord(randomWord);
    if (scrambled === randomWord && randomWord.length > 1)
      scrambled = shuffleWord(randomWord.split("").reverse().join(""));

    setWord(randomWord);
    setScrambledWord(scrambled);
    setUserInput("");
    setMessage("Unscramble the word!");
    setAttempts(0);
    setRevealed(new Set());
    setShowAnswer(false);
    setHintActive(false);
  };

  const revealOneLetter = () => {
    if (!word) return;
    if (hintActive) {
      setMessage("Please wait for the current hint to expire");
      return;
    }
    const indices = [...Array(word.length).keys()].filter((i) => !revealed.has(i));
    // don't reveal the final remaining letter because that would show the whole word
    if (indices.length <= 1) {
      setMessage("No more hints available without revealing the whole word");
      return;
    }

    const pick = indices[Math.floor(Math.random() * indices.length)];
    const nextSet = new Set(revealed);
    nextSet.add(pick);
    setRevealed(nextSet);
    setMessage(`Hint: one letter revealed (visible for ${Math.round(HINT_DURATION/1000)}s)`);

    // mark hint as active and remove the revealed letter after HINT_DURATION so it's temporary
    setHintActive(true);
    setTimeout(() => {
      setRevealed((prev) => {
        const copy = new Set(prev);
        copy.delete(pick);
        return copy;
      });
      setHintActive(false);
    }, HINT_DURATION);
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    setMessage(`Answer: ${word}`);
    // then advance to next word after a short pause
    setTimeout(() => {
      nextWord();
    }, 1200);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setMessage(`Game Over! Your final score: ${score}`);
  };

  // Auto end after 10 points (optional)
  useEffect(() => {
    if (score >= 10) {
      // inline endGame to avoid missing dependency warnings from eslint
      setIsPlaying(false);
      setGameOver(true);
      setMessage(`Game Over! Your final score: ${score}`);
    }
  }, [score]);

  return (
    <div className="word-scramble-container">
      <h1>Word Scramble</h1>

      {loading ? (
        <p>Loading words…</p>
      ) : isPlaying && !gameOver ? (
        <div className="scramble-box">
          <div className="game-info">
            <p className="score">Score: {score}</p>
            <p className="message">{message}</p>
          </div>
          <h2 className="scrambled-word">{scrambledWord}</h2>
          <div className="hint-pattern" style={{ marginBottom: 12 }}>
            {showAnswer
              ? word
              : word
                  .split("")
                  .map((ch, i) => (revealed.has(i) ? ch : "_")).join(" ")}
          </div>
          <input
            type="text"
            placeholder="Type your guess..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
          />
          <div className="controls">
            <button className="check-btn" onClick={checkAnswer}>
              Submit
            </button>
            <button className="skip-btn" onClick={nextWord}>
              Skip
            </button>
            <button
              className="skip-btn"
              onClick={revealOneLetter}
              style={{ background: "#ffaa33", color: "black" }}
              disabled={hintActive || showAnswer}
            >
              {hintActive ? "Hint (wait...)" : "Hint"}
            </button>
            <button className="end-btn" onClick={revealAnswer} style={{ marginLeft: 8 }}>
              Show Answer
            </button>
          </div>
        </div>
      ) : (
        <div>
          {!isPlaying ? (
            <div className="preplay">
              <div className="rules-box">
                <h3>How to play</h3>
                <ol>
                  <li>Unscramble the letters to form a valid English word.</li>
                  <li>Type your guess and press <strong>Submit</strong> or hit <strong>Enter</strong>.</li>
                  <li>Use <strong>Hint</strong> to reveal one letter temporarily (cooldown applies).</li>
                  <li>After 3 wrong attempts the answer will be revealed automatically.</li>
                  <li>Each correct answer gives +1 point. The game ends at 10 points.</li>
                </ol>
              </div>
              <button className="start-btn" onClick={startGame}>
                {gameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          ) : (
            <button className="end-btn" onClick={endGame}>
              End Game
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WordScramble;
