import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css";

export const RandomAnimeQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const generateQuote = async () => {
    try {
      setQuote(null);
      const res = await axios.get(
        "/api/v1/quotes/random"
      );
      console.log(res.data.data);
      //   const res = {
      //     status: "success",
      //     data: {
      //       content: "Whenever I counted on someone, I ended up getting hurt.",
      //       anime: {
      //         id: 2,
      //         name: "Hanasaku Iroha",
      //       },
      //       character: {
      //         id: 5,
      //         name: "Ohana Matsumae",
      //       },
      //     },
      //   };
      setQuote(res.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
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
          <div className="rquote-quote">{quote.content}</div>
          <div className="rquote-author">
            - {quote.character.name} ({quote.anime.name})
          </div>
        </div>
      )}
      {error && <div className="rquote-content error">Too many requests have been sent to the API. Please try again after an hour.</div>}
      {!quote && !error && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )}
      <button className="rquote-button" onClick={() => generateQuote()}>
        Generate Quote
      </button>
    </div>
  );
};
