import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css";

export const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const generateQuote = () => {
    setQuote(null);
    axios({
      method: "GET",
      url: "https://api.qutable.io/random",
    })
      .then((res) => setQuote(res.data))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div className="rquote-root">
      <h1 class="header">Random Quote Generator</h1>
      <div class="description">
        Generate any random quote to get some inspiration!
      </div>
      {quote && (
        <div className="rquote-content">
          <div className="rquote-quote">{quote.content}</div>
          <div className="rquote-author">- {quote.author}</div>
        </div>
      )}
      {error && (
        <div className="rquote-content error">
          {error.message}
        </div>
      )}
      {!quote && !error && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )}
      <button className="rquote-button" onClick={generateQuote}>
        Generate Quote
      </button>
    </div>
  );
};
