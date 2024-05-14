import React, { useState } from "react";
import xml2js from "xml2js";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useApiBoardgames } from "../hooks/ApiBoardgames";
import Layout from "../components/Layout";
const SearchPage = () => {
  const { getSearchBoardgame } = useApiBoardgames();
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [boardGames, setBoardGames] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const data = await getSearchBoardgame({ setErrors, searchTerm });
      const dataParser = new xml2js.Parser({ explicitArray: false });
      dataParser.parseString(data, (err, result) => {
        if (err) {
          throw new Error("Error parsing XML:", err);
        }
        if (result && result.items) {
          if (result.items.item) {
            if (!Array.isArray(result.items.item)) {
              result.items.item = [result.items.item];
            }
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
            setBoardGames([]);
            alert(errorMessage);
          }
        } else {
          setErrorMessage("Results not found");
          setBoardGames([]);
          alert(errorMessage);
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
        <input
          className="border border-gray-300 rounded-md p-2 mb-4"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a game..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleSearch}
        >
          Search
          <FaSearch className="ml-2" />
        </button>
        <ul className="mt-4">
          {boardGames.map((game) => (
            <li
              key={game.id}
              className="cursor-pointer bg-orange-100 border border-orange-400 hover:text-white rounded-md p-2 mb-2 hover:bg-orange-400 transition-colors duration-300"
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
