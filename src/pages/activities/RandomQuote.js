import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css"; // Reuse your styles

export const RandomQuote = () => {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState(null);

  const generateJoke = () => {
    setJoke(null);
    setError(null);

    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((res) => setJoke(res.data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <div className="rquote-root">
      <h1 className="header">Random Joke Generator</h1>
      <div className="description">
        Get a random joke to brighten your day 😄
      </div>

      {joke && (
        <div className="rquote-content">
          <div className="rquote-quote">{joke.setup}</div>
          <div className="rquote-author">{joke.punchline}</div>
        </div>
      )}

      {error && (
        <div className="rquote-content error">{error.message}</div>
      )}

      {!joke && !error && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )}

      <button className="rquote-button" onClick={generateJoke}>
        Generate Joke
      </button>
    </div>
  );
};
