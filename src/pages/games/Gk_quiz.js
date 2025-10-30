import React, { useEffect, useState, useRef } from "react";
import "../../styles/pages/games/Gk_quiz.css";

const ALL_QUESTIONS = [
  { q: "Which is the largest planet in our Solar System?", options: ["Earth", "Jupiter", "Saturn", "Mars"], ans: 1 },
  { q: "Who wrote the national anthem of India?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Jawaharlal Nehru"], ans: 1 },
  { q: "Which is the longest river in the world?", options: ["Nile", "Amazon", "Ganga", "Yangtze"], ans: 0 },
  { q: "The Red Planet is:", options: ["Mars", "Mercury", "Venus", "Jupiter"], ans: 0 },
  { q: "Who is known as the Father of Computers?", options: ["Charles Babbage", "Alan Turing", "Tim Berners-Lee", "Bill Gates"], ans: 0 },
  { q: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], ans: 2 },
  { q: "Which country is called the ‘Land of the Rising Sun’?", options: ["India", "Japan", "China", "South Korea"], ans: 1 },
  { q: "What is the currency of the United Kingdom?", options: ["Euro", "Pound sterling", "Dollar", "Yen"], ans: 1 },
  { q: "Taj Mahal is located in:", options: ["Delhi", "Agra", "Jaipur", "Varanasi"], ans: 1 },
  { q: "Which organ purifies blood in the human body?", options: ["Heart", "Lungs", "Kidneys", "Brain"], ans: 2 },
  { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], ans: 2 },
  { q: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], ans: 2 },
  { q: "Who invented the light bulb?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "James Watt"], ans: 0 },
  { q: "Which is the largest ocean on Earth?", options: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"], ans: 3 },
  { q: "What is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Peacock"], ans: 1 },
  { q: "Which festival is known as the Festival of Lights?", options: ["Holi", "Diwali", "Eid", "Baisakhi"], ans: 1 },
  { q: "How many continents are there in the world?", options: ["5", "6", "7", "8"], ans: 2 },
  { q: "Which is the highest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Nanda Devi"], ans: 2 },
  { q: "Who was the first woman Prime Minister of India?", options: ["Indira Gandhi", "Sarojini Naidu", "Pratibha Patil", "Sushma Swaraj"], ans: 0 },
  { q: "Which is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Silver"], ans: 2 }
];

const QUESTION_TIME = 15; // seconds

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GKQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosenIndex, setChosenIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  // to clear interval when question changes or component unmounts
  const timerRef = useRef(null);

  useEffect(() => {
    startQuiz();
  }, []);

  // start timer whenever question changes
  useEffect(() => {
    if (questions.length === 0) return;
    startTimer();
    return () => {
      clearInterval(timerRef.current);
    };
  }, [current, questions]);

  function startTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!answered) {
            handleTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleTimeUp() {
    const qObj = questions[current];
    setAnswered(true);
    setChosenIndex(null);
    setWrong((w) => w + 1);
  }

  function startQuiz() {
    const shuffled = shuffleArray(ALL_QUESTIONS).slice(0, 5);
    setQuestions(shuffled);
    setCurrent(0);
    setCorrect(0);
    setWrong(0);
    setAnswered(false);
    setChosenIndex(null);
    setShowResult(false);
    setTimeLeft(QUESTION_TIME);
  }

  function handleOptionClick(index) {
    if (answered) return;
    const qObj = questions[current];
    setChosenIndex(index);
    setAnswered(true);
    clearInterval(timerRef.current);
    if (index === qObj.ans) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
  }

  function handleNext() {
    if (current === questions.length - 1) {
      setShowResult(true);
      clearInterval(timerRef.current);
      return;
    }
    setCurrent((c) => c + 1);
    setAnswered(false);
    setChosenIndex(null);
  }

  if (questions.length === 0) return <div className="gk-quiz-loading">Loading quiz…</div>;

  if (showResult) {
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    return (
      <div className="gk-quiz-wrapper">
        <div className="gk-quiz-container">
          <div className="gk-quiz-header">
            <h2 className="gk-quiz-title">Quiz Completed!</h2>
            <p className="gk-quiz-subtitle">Your performance summary</p>
          </div>
          <div className="gk-quiz-result">
            <p>Total Questions: {total}</p>
            <p>Correct: {correct}</p>
            <p>Wrong: {wrong}</p>
            <p>Score: {score}%</p>
            <button className="gk-quiz-btn" onClick={startQuiz}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  const qObj = questions[current];
  const pct = Math.round((timeLeft / QUESTION_TIME) * 100);

  return (
    <div className="gk-quiz-wrapper">
      <div className="gk-quiz-container">
        <div className="gk-quiz-header">
          <h2 className="gk-quiz-title">General Knowledge Quiz</h2>
          <p className="gk-quiz-subtitle">Answer the questions and check instantly</p>
        </div>
        <div className="gk-quiz-body">
          <div className="gk-top-row">
            <p className="gk-quiz-progress">Question {current + 1} of {questions.length}</p>
            <div className={`gk-timer ${timeLeft <= 5 ? "low" : ""}`}>
              <div className="gk-timer-bar" style={{ width: pct + "%" }}></div>
              <span className="gk-timer-text">{timeLeft}s</span>
            </div>
          </div>
          <h3 className="gk-quiz-question">{qObj.q}</h3>
          <div className="gk-quiz-options">
            {qObj.options.map((opt, idx) => {
              const isCorrect = idx === qObj.ans;
              const isChosen = idx === chosenIndex;
              let extraClass = "";
              if (answered) {
                if (isCorrect) extraClass = "gk-correct";
                else if (isChosen && !isCorrect) extraClass = "gk-wrong";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`gk-quiz-option ${extraClass}`}
                  disabled={answered}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="gk-quiz-feedback">
              {chosenIndex === qObj.ans
                ? <>✅ Correct! The right answer is: {qObj.options[qObj.ans]}</>
                : <>❌ Time up / wrong! The correct answer is: {qObj.options[qObj.ans]}</>}
            </div>
          )}
          {answered && (
            <button className="gk-quiz-btn" onClick={handleNext}>
              {current === questions.length - 1 ? "Show Result" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
