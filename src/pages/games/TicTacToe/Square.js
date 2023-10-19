import React from "react";
import "../../../styles/pages/games/TicTacToe/square.css";

const Square = (props) => {
  return (
    <div onClick={props.onClick} className="square">
      {props.value === "X" ? (
        <h5 className="font red">{props.value}</h5>
      ) : (
        <h5 className="font green">{props.value}</h5>
      )}
    </div>
  );
};

export default Square;
