import { useState } from "react";
import "../../styles/pages/games/MagicSquares.css";

export const MagicSquares = () => {
    const newBoard = [
        { index: 0, value: "" },
        { index: 1, value: "" },
        { index: 2, value: "" },
        { index: 3, value: "" },
        { index: 4, value: "" },
        { index: 5, value: "" },
        { index: 6, value: "" },
        { index: 7, value: "" },
        { index: 8, value: "" },
    ];

    const [board, setBoard] = useState(newBoard);

    const [focusCell, setFocusCell] = useState("");
    const [cellInputValue, setCellInputValue] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [magicNumber, setMagicNumber] = useState(15);
    const [winFlag, setWinFlag] = useState(0);

    const changeMagicNumber = () => {
        const pool = [15, 18, 24, 30, 36, 42, 45, 48, 60, 72, 78, 84, 90];
        const r = parseInt(Math.random() * pool.length);
        setMagicNumber(pool[r]);
        setErrMsg("");
        setWinFlag(0);
        setBoard(newBoard);
    };

    const callError = (err_msg) => {
        setErrMsg(err_msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    };

    const checkFn = () => {
        console.log("in check function");
        let flag_empty = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i].value === "") {
                flag_empty = 1;
                callError("You must fill all the cells!");
                break;
            }
        }

        if (flag_empty !== 1) {
            let flag_row = 0;
            let flag_col = 0;
            let flag_dia = 0;
            if (
                // Row 1
                parseInt(board[0].value) +
                parseInt(board[1].value) +
                parseInt(board[2].value) !==
                parseInt(magicNumber) ||
                // Row 2
                parseInt(board[3].value) +
                parseInt(board[4].value) +
                parseInt(board[5].value) !==
                parseInt(magicNumber) ||
                // Row 3
                parseInt(board[6].value) +
                parseInt(board[7].value) +
                parseInt(board[8].value) !==
                parseInt(magicNumber)
            ) {
                flag_row = 1;
                callError("Some of your rows don't add up. Try again!");
            }

            if (
                flag_row === 0 &&
                // Col 1
                (parseInt(board[0].value) +
                    parseInt(board[3].value) +
                    parseInt(board[6].value) !==
                    parseInt(magicNumber) ||
                    // Col 2
                    parseInt(board[1].value) +
                    parseInt(board[4].value) +
                    parseInt(board[7].value) !==
                    parseInt(magicNumber) ||
                    // Col 3
                    parseInt(board[2].value) +
                    parseInt(board[5].value) +
                    parseInt(board[8].value) !==
                    parseInt(magicNumber))
            ) {
                flag_col = 1;
                callError("Some of your columns don't add up. Try again!");
            }

            if (
                flag_col === 0 &&
                flag_row === 0 &&
                // Diagonal 1
                (parseInt(board[0].value) +
                    parseInt(board[4].value) +
                    parseInt(board[8].value) !==
                    parseInt(magicNumber) ||
                    // Diagonal 2
                    parseInt(board[2].value) +
                    parseInt(board[4].value) +
                    parseInt(board[6].value) !==
                    parseInt(magicNumber))
            ) {
                flag_dia = 1;
                callError("Some of your diagonals don't add up. Try again!");
            }

            if (flag_row === 0 && flag_col === 0 && flag_dia === 0) {
                console.log("its a win!");
                setWinFlag(1);
            }
        }
    };

    return (
        <div className="ms-container">
            <div className="ms-heading">The Magic Squares Game</div>
            <div className="three-col-table">
                <div className="each-col">
                    <div className="ms-subheading">Your Magic Number is</div>
                    <div className="ms-number">{magicNumber}</div>
                    <div
                        className="button"
                        onClick={() => {
                            setWinFlag(0);
                            changeMagicNumber();
                        }}
                    >
                        {winFlag === 0 ? "Get another number" : "PLAY AGAIN"}
                    </div>
                    <div className="game-outcome">
                        {winFlag === 1 && "You're a winner, genius!"}
                    </div>
                    <div className="game-error">{errMsg.length !== 0 && errMsg}</div>
                </div>
                <div className="each-col">
                    <div className="grid-container">
                        {board?.map((cell, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className={
                                        focusCell === cell.index ? "grid-cell-focus" : "grid-cell"
                                    }
                                    onClick={() => {
                                        if (!winFlag) {
                                            setFocusCell(cell.index);
                                            setCellInputValue("");
                                        }
                                    }}
                                >
                                    <div className="grid-text">{cell.value}</div>
                                </span>
                            );
                        })}
                    </div>
                    <div
                        className="button"
                        onClick={() => {
                            if (!winFlag) {
                                checkFn();
                            }
                        }}
                    >
                        Check
                    </div>
                </div>
                <div className="each-col">
                    <div className="ms-subheading">
                        Selected Cell No. {focusCell === "" ? "--" : focusCell + 1}
                    </div>
                    <span>Insert number:</span>
                    <input
                        type="number"
                        value={cellInputValue}
                        onChange={(e) => setCellInputValue(e.target.value)}
                    />
                    <div
                        className="button"
                        onClick={() => {
                            if (!winFlag) {
                                if (focusCell === "") {
                                    callError("No cell selected!");
                                } else if (cellInputValue === "") {
                                    callError("Nothing to insert!");
                                } else {
                                    let tempBoard = board;
                                    if (focusCell !== "")
                                        tempBoard[focusCell].value = cellInputValue;
                                    // console.log("focus on", focusCell, tempBoard);
                                    setBoard(tempBoard);
                                    setFocusCell("");
                                }
                            }
                        }}
                    >
                        Insert
                    </div>
                    <hr />
                    <div className="rules">
                        <div className="ms-subheading">Rules</div>
                        Create a magic square with any set of 9 numbers
                        <br />
                        under then sun.
                        <br />
                        Your only constraints are :
                        <br />
                        Each row must add up to the magic number.
                        <br />
                        Each column must add up to the magic number.
                        <br />
                        Each diagonal must add up to the magic number.
                        <br />
                        Enjoy!
                    </div>
                </div>
            </div>
        </div>
    );
};
