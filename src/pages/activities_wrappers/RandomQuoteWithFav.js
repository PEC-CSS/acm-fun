import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css";
import FavoriteButton from "../../components/common/FavoriteButton";

export const RandomQuoteWithFav = () => {
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
      <div className="description">Get a random quote to inspire your day 💡</div>

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

      <div className="rquote-actions">
        <button className="rquote-button" onClick={generateQuote}>
          Generate Quote
        </button>
        {quote && (
          <FavoriteButton
            item={{
              type: 'quote',
              content: { text: quote.q, author: quote.a },
              meta: { source: 'stoic-quotes' },
            }}
          />
        )}
      </div>
    </div>
  );
};
