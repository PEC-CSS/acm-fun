import { useEffect, useState } from "react";
import "../../styles/pages/games/MagicSquares.css";

export const MagicSquares = () => {
  return (
    <div class="ms-container">
      <div class="ms-heading">The Magic Squares Game</div>
      <div class="three-col-table">
        <div class="each-col">
          <div class="ms-subheading">Your Magic Number is</div>
          <div class="ms-number">45</div>
          <div class="button">Get another number</div>
          <div class="ms-subheading">Lives Remaining</div>
          <div class="ms-number">5</div>
        </div>
        <div class="each-col">
          <div class="grid-container">
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
            <span class="grid-cell"></span>
          </div>
          <div class="button">Check</div>
        </div>
        <div class="each-col">
          <div class="ms-subheading">Selected Square --</div>
          <span>Insert number:</span>
          <input />
          <div class="button">Insert</div>
          <hr/>
          <div class="rules">
            <div class="ms-subheading">Rules</div>
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
