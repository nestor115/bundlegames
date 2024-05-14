import React, { useState, useEffect } from "react";
import xml2js from "xml2js";
import { useApiBoardgames } from "../hooks/ApiBoardgames";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useDatabase } from "../hooks/Database";
const Game = ({ id }) => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [gameImage, setGameImage] = useState("");
  const { getBoardGameInfo } = useApiBoardgames();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const { deleteBoardgame } = useDatabase();
  useEffect(() => {
    const getInfo = async function (id) {
      const data = await getBoardGameInfo({ setErrors, id });

      const dataParser = new xml2js.Parser({ explicitArray: false });
      dataParser.parseString(data, (err, result) => {
        if (err) throw err;
        if (result) {
          let game = null;

          if (result.items && result.items.item) {
            game = result.items.item;
          } else if (result.item) {
            game = result.item;
          }

          if (game) {
            let nameValue = "";
            let imageUrl = "";

            // Obtener el nombre del juego
            if (game.name && Array.isArray(game.name)) {
              const primaryName = game.name.find(
                (name) => name.$.type === "primary"
              );
              nameValue = primaryName ? primaryName.$.value : "";
            } else if (game.name && game.name.$ && game.name.$.value) {
              nameValue = game.name.$.value;
            }

            // Obtener la URL de la imagen del juego
            if (game.image) {
              imageUrl = game.image;
            }
            setGameName(nameValue);
            setGameImage(imageUrl);
            setLoading(false);
          }
        }
      });
    };

    getInfo(id);
  }, []);

  const handleDeleteGame = async () => {
    await deleteBoardgame(id);
    window.location.reload();
  };

  if (loading) {
    return <Loading source="BoardgamesPage" />;
  }

  return (
    <div
      className="m-6 max-w-xs h-80 bg-white border-2 border-gray-300 rounded-lg shadow"
      style={{ width: "300px" }}
    >
      <img
        className=" max-h-40 rounded-3xl mx-auto mt-4"
        src={gameImage}
        alt={gameName}
      />
      <div className="p-5 text-center">
        <h5
          className="mb-2 text-gray-900"
          style={{
            fontSize: gameName.length > 20 ? "1rem" : "1.5rem",
            lineHeight: "1.2",
            maxHeight: "3.6em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {gameName}
        </h5>
        <div className="flex justify-between ">
          <button className="bg-blue-300 text-black hover:bg-blue-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer">
            <Link to={`/boardgames/${id}`}>Details</Link>
          </button>
          <button
            className="bg-blue-300 text-black hover:bg-blue-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer"
            onClick={handleDeleteGame}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
