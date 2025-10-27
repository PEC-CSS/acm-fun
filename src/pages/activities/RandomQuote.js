import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css";

export const RandomQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const generateQuote = () => {
    setQuote(null);
    setError(null);

    const url = "https://stoic-quotes.com/api/quote";
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      url + `?t=${Date.now()}`
    )}`;

    axios
      .get(proxyUrl)
      .then((res) => {
        // Parse the contents returned by the proxy
        const data = JSON.parse(res.data.contents);
        setQuote({ q: data.text, a: data.author });
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div className="rquote-root">
      <h1 className="header">Random Quote Generator</h1>
      <div className="description">
        Get a random quote to inspire your day 💡
      </div>

      {quote && (
        <div className="rquote-content">
          <div className="rquote-quote">“{quote.q}”</div>
          <div className="rquote-author">— {quote.a || "Unknown"}</div>
        </div>
      )}

      {error && <div className="rquote-content error">{error.message}</div>}

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
