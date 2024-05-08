import React, { useState } from "react";
import xml2js from "xml2js";
import { useNavigate } from "react-router-dom";

import { useApiBoardgames } from "../hooks/ApiBoardgames";
import Layout from "../components/Layout";
const SearchPage = () => {
  const { getSearchBoardgame } = useApiBoardgames();
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [boardGames, setBoardGames] = useState([]);
  const navigate = useNavigate();

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
        console.log(result);
        console.log(result.items);
        console.log(result.items.item);
        if (result && result.items && result.items.item) {
          // Verificar si solo hay un elemento en items
          if (!Array.isArray(result.items.item)) {
            // Si es un objeto, convertirlo en un array de un solo elemento
            result.items.item = [result.items.item];
          }
          // Iterar sobre cada elemento en items
          const games = result.items.item.map((item) => ({
            id: item.$.id,
            name: item.name.$.value,
            yearpublished: item.yearpublished
              ? item.yearpublished.$.value
              : "date not available",
          }));
          setBoardGames(games);
        } else {
          setErrorMessage("Results not found");
        }
      });
    } catch (error) {
      console.error("Error searching for games:", error);
    }
  };
  function goToDetails(id) {
    navigate(`/game/${id}`);
  }

  return (
    <Layout showButtons={true}>

    <div className="container mx-auto p-6">
      {/* Input field for search term */}
      <input
        className="border border-gray-300 rounded-md p-2 mb-4"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a game..."
      />
      {/* Button to trigger search */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <ul className="mt-4">
        {/* Display search results */}
        {boardGames.map((game) => (
          <li
            key={game.id}
            className="cursor-pointer border border-gray-300 rounded-md p-2 mb-2 hover:bg-orange-200"
            onClick={() => goToDetails(game.id)}
          >
            <span className="font-semibold">{game.name}</span> -{" "}
            {game.yearpublished}
          </li>
        ))}
      </ul>
    </div>
    </Layout>

  );
};

export default SearchPage;
