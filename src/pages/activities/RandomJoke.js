import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomJoke.css";

export const RandomJoke = () => {

    const [joke, setJoke] = useState(null);
    const [error, setError] = useState(null);

    const generateJoke = () => {
        setJoke(null);
        axios({
          method: "GET",
          url: "https://v2.jokeapi.dev/joke/Any",
        })
          .then((res) => setJoke(res.data))
          .catch((error) => setError(error));
      };

      useEffect(() => {
        generateJoke();
      }, []);

      return (
        <div className="root">
          <h1 class="header">Random Joke Generator</h1>
          <div class="description">
            Generate any random joke to get some laugh!
          </div>
          {joke && (
            
            <div className="content">
                {joke.type === "single" ? (
                  <div>{joke.joke}</div>
                ) : (
                    <div>
                      <div>{joke.setup}</div>
                      <div>{joke.delivery}</div>
                    </div>
                )}
            </div>

          )}
          {error && (
            <div className="content error">{error.message}</div>
          )}
          {!joke && !error && (
            <div className="spinner-wrapper">
              <div className="spinner"></div>
            </div>
          )}
          <button className="button" onClick={generateJoke}>
            Generate Joke
          </button>
        </div>
      );
};