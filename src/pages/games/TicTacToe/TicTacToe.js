import React, { useState } from "react";
import Square from "./Square";
import "../../../styles/pages/games/TicTacToe/TicTacToe.css";
import ReactConfetti from "react-confetti";

export const TicTacToe = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isTurnOfX, setTurnOfX] = useState(true);

  const resetGame = () => {
    setState(Array(9).fill(null));
    setTurnOfX(true);
  };

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const MarkCell = (index) => {
    if (state[index] != null) {
      return;
    }
    const newState = [...state];
    newState[index] = isTurnOfX ? "X" : "O";
    setTurnOfX(!isTurnOfX);
    setState(newState);
  };

  return (
    <>
      <div className="heading"> Let's Play TicTacToe</div>
      <div className="middle">
        <div className="board-container">
          <div className="board-row">
            <Square onClick={() => MarkCell(0)} value={state[0]} />
            <Square onClick={() => MarkCell(1)} value={state[1]} />
            <Square onClick={() => MarkCell(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => MarkCell(3)} value={state[3]} />
            <Square onClick={() => MarkCell(4)} value={state[4]} />
            <Square onClick={() => MarkCell(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => MarkCell(6)} value={state[6]} />
            <Square onClick={() => MarkCell(7)} value={state[7]} />
            <Square onClick={() => MarkCell(8)} value={state[8]} />
          </div>
        </div>
      </div>

      <div className="lowerContainer">
        {isWinner ? (
          <div>
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
            <div className="lower"> {isWinner} Won The Game </div>
          </div>
        ) : (
          <div className="lower">
            Currently, Turn Of {isTurnOfX ? "X" : "O"}
          </div>
        )}
        <button className="resetButton" onClick={() => resetGame()}>
          {" "}
          Reset
        </button>
      </div>
    </>
  );
};
