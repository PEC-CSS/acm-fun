import { useState } from "react";
import axios from "axios";
import "../../styles/pages/activities/getDefinition.css";

export const SearchWord = () => {
  const [term, setTerm] = useState();
  const [definition, setDefinition] = useState([]);

  const generateDefinition = () => {
    axios({
      method: "GET",
      url: "https://api.urbandictionary.com/v0/define",
      params: {
        term: term,
      },
    })
      .then((res) => {
        console.log(res.data)
        const allDefinitions = res.data.list;
        if (allDefinitions.length) {
          setDefinition(allDefinitions);
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
        {definition.map((def, index) => (
        <div className="word-definition">
            <div key={index}><em>Definition: </em>{def.definition}</div>
            <div key={index}><em>Example: </em>{def.example}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
