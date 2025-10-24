import React, { useState } from "react";
import "../../styles/pages/games/TicTacToe.css";

export const TicTacToe = () => {
  const initialBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [board, setBoard] = useState(initialBoard);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [message, setMessage] = useState("");

  const isWinner = (b) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winCombos.some(([a, b1, c]) => b[a] === b[b1] && b[b1] === b[c]);
  };

  const handleMove = (index) => {
    if (message || board[index] === "X" || board[index] === "O") return;

    const newBoard = [...board];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    if (isWinner(newBoard)) {
      setMessage(`Player ${playerTurn} wins!`);
      return;
    }

    if (newBoard.every((c) => c === "X" || c === "O")) {
      setMessage("DRAW..");
      return;
    }

    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setPlayerTurn("X");
    setMessage("");
  };

  return (
    <div className="tictactoe-container">
      <h2>Tic Tac Toe</h2>
      <div className="board">
        {board.map((cell, i) => (
          <div key={i} className="cell" onClick={() => handleMove(i)}>
            {cell === "X" || cell === "O" ? cell : ""}
          </div>
        ))}
      </div>
      <p className="status">
        {message ? message : `Player ${playerTurn}'s turn`}
      </p>
      {message && (
        <button className="reset-btn" onClick={resetGame}>
          Restart
        </button>
      )}
    </div>
  );
};
