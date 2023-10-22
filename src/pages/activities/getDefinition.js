import { useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/getDefinition.css";

export const SearchWord = () => {
  const [term, setTerm] = useState();
  const [definition, setDefinition] = useState();

  const generateDefinition = () => {
    axios({
      method: "GET",
      url: "https://api.urbandictionary.com/v0/define",
      params: {
        term: term,
      },
    })
      .then((res) => {
        const firstDefinition = res.data.list[0];
        if (firstDefinition) {
          setDefinition(firstDefinition.definition);
        } else {
          setDefinition("No definition found.");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    generateDefinition();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateDefinition();
    }
  };

  return (
    <div className="rquote-root">
      <h1>Your Virtual Dictionary</h1>
      <div>Search a word to get the Meaning Instantly!</div>
      <div><br></br></div>
      <div className="search-bar">
        <input
          id="Search"
          type="text"
          placeholder="Enter a word"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button onClick={handleSearch} className="word-button">Search</button>
      </div>
      <div className="word-content">
        <div className="word-definition">{definition}</div>
      </div>
    </div>
  );
};
