import React, { useEffect, useState } from "react";
import flagData from "../../assets/games/flag guess/flagset.json";
import "../../styles/pages/games/GuessFlag.css";

export const GuessTheFlag=()=> {
  const [randCode, setRandCode] = useState("");
  const [randName, setRandName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [lifelines, setLifelines] = useState(3);
  const [score, setScore] = useState(0);
  const [hintOneUsed, setHintOneUsed] = useState(false);
  const [hintTwoUsed, setHintTwoUsed] = useState(false);
  const [hintOneMessage,setHintOneMessage]=useState("");
  const [hintTwoMessage,setHintTwoMessage]=useState("");

  useEffect(() => {
    generateRandomFlag();
  }, []); // Empty dependency array ensures useEffect runs once after the initial render

  const generateRandomFlag = () => {
    const countryCodes = Object.keys(flagData);
    const randomCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    setRandCode(randomCode);
    setRandName(flagData[randomCode]);
    setUserInput("");
    setHintOneUsed(false); // Reset hint usage flag for the new flag
    setHintTwoUsed(false); // Reset hint usage flag for the new flag
    setHintOneMessage("");
    setHintTwoMessage("");
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleHintOneClick = () => {
    if (!hintOneUsed) {
      const letters = randName.split("").map((char) => (char !== " " ? "_" : " ")).join(" ");
      setHintOneMessage(`Hint One: ${letters}`);
      setHintOneUsed(true);
    }
  };
  const handleHintTwoClick = () => {
    if (hintOneUsed && !hintTwoUsed) {
      let revealedLettersCount = Math.floor(0.3 * randName.replace(/ /g, '').length); 
      const characters = randName.split('');
      const hiddenNameArray = characters.map((char) => {
        if (char !== ' ' && revealedLettersCount > 0 && Math.random() < 0.7) {
          revealedLettersCount--;
          return char;
        }
        return '_';
      });
  
      // Reveal two random letters
      for (let i = 0; i < 2; i++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * characters.length);
        } while (characters[randomIndex] === ' ' || hiddenNameArray[randomIndex] !== '_');
        hiddenNameArray[randomIndex] = characters[randomIndex];
      }
  
      setHintTwoMessage(`Hint Two: ${hiddenNameArray.join('')}`);
      setHintTwoUsed(true);
    } else {
      if (!hintOneUsed) {
        setMessage('Use hint one first for three points');
      } else {
        setMessage('All hints used ');
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === randName.toLowerCase()) {
      if (hintOneUsed && hintTwoUsed) {
        setScore(score + 1); // Add 3 points for correct guess with a hint
      } else if (hintOneUsed) {
        setScore(score+3)
      } 
      else{
        setScore(score + 5); // Add 5 points for correct guess without a hint
      }
      setMessage("You guessed correctly!");
      generateRandomFlag();
    } else {
      if (lifelines > 1) {
        setMessage(`Wrong guess! ${lifelines - 1} lifelines left.The correct answer was: ${randName}`);
        setLifelines(lifelines - 1);
        generateRandomFlag();
      } else {
        setMessage(`Sorry, you lost. The correct answer was: ${randName}`);
        setLifelines(0);
      }
    }
  };


  const hearts = Array.from({ length: lifelines }, (_, index) => (
    <span key={index} className="heart">
      ❤️
    </span>
  ));

  return (
    <div className="fgcontainer">
      <nav className="flagnav">
      <h1 >GUESS THE FLAG!</h1>
      </nav>
      <div className="fgscore">Total Score: {score}</div>
      <div className="hearts">{hearts}</div>
      <img
        className="RandFlag"
        src={`https://flagcdn.com/w320/${randCode}.png`}
        srcSet={`https://flagcdn.com/w640/${randCode}.png 2x`}
        alt={randName}
        width={320}
        height={213}
      />
        <p className="fgmessage">{message}</p>
      <form className="fgform" onSubmit={handleSubmit}>
        <input
          className="fginput"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your guess"
          disabled={lifelines === 0}
        />
        <div className="hint-container">
          <p>{hintOneMessage}</p>
        <button className="fgbutton" type="button" onClick={handleHintOneClick} disabled={lifelines === 0 || hintOneUsed}>
          Hint 1
        </button>
        </div>
        <div className="hint-container">
          <p>{hintTwoMessage}</p>
        <button className="fgbutton" type="button" onClick={handleHintTwoClick} disabled={lifelines === 0 || hintTwoUsed}>
          Hint 2
        </button>
        </div>
      </form>

    </div>
  );
}

