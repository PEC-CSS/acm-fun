import { useEffect, useState } from "react";
import "../../styles/pages/activities/RandomQuote.css";

export const RandomAnimeQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const generateQuote = async () => {
    try {
      setQuote(null);
      setError(null);

      const response = await fetch("https://animotto-api.onrender.com/api/quotes/random");
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      setQuote({
        quote: data.quote,
        character: data.character,
        anime: data.anime.name || data.anime.altName || "Unknown"
      });
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div className="rquote-root">
      <h1 className="header">Random Anime Quote Generator</h1>
      <div className="description">
        Generate any random anime quote to get some inspiration!
      </div>

      {quote && (
        <div className="rquote-content">
          <div className="rquote-quote">{quote.quote}</div>
          <div className="rquote-author">
            - {quote.character} ({quote.anime})
          </div>
        </div>
      )}

      {error && (
        <div className="rquote-content error">
          Error fetching quote. Please try again later.
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
