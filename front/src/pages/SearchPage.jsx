import React, { useState, useEffect } from "react";
import axios from "axios";
import xmlJs from "xml-js";
import xml2js from "xml2js";

import { useApiBoardgames } from "../hooks/ApiBoardgames";
const SearchPage = () => {
  const { getSearchBoardgame } = useApiBoardgames();
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [boardGames, setBoardGames] = useState([]);
  // Function to handle the search operation
  const handleSearch = async () => {
    try {
      // Send GET request to search for board games based on user input
      const data = await getSearchBoardgame({ setErrors, searchTerm });
      const dataParser = new xml2js.Parser({ explicitArray: false });
      dataParser.parseString(data, (err, result) => {
        if (err) {
          throw new Error("Error parsing XML:", err);
        }

        const items = result.items.item;
        const games = items.map((item) => ({
           id: item.$.id,
           name: item.name.$.value,
           yearpublished : item.yearpublished ? item.yearpublished.$.value : 'Fecha no disponible'
        }));
        setBoardGames(games);
      });
    } catch (error) {
      console.error("Error searching for games:", error);
    }
  };


  return (
    <div>
      {/* Input field for search term */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a game..."
      />
      {/* Button to trigger search */}
      <button onClick={handleSearch}>Search</button>
      {/* Display error message, if any */}
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {boardGames.map((game) => (
          <li key={game.id}>
            {game.id}, {game.name}, {game.yearpublished}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
