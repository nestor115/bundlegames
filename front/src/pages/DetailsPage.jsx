import React, { useState, useEffect } from "react";
import xml2js from "xml2js";
import { useParams } from "react-router-dom";
import { useApiBoardgames } from "../hooks/ApiBoardgames";
import ButtonComponent from "../components/ButtonComponent";
import FriendDetails from "../components/FriendDetails";
import Loading from "../components/Loading";

const DetailsPage = (props) => {
  const { id } = useParams();
  const { getBoardGameInfo } = useApiBoardgames();
  const [gameDetails, setGameDetails] = useState(null);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getInfo = async function (id) {
      const data = await getBoardGameInfo({ setErrors, id });

      const dataParser = new xml2js.Parser({ explicitArray: false });
      dataParser.parseString(data, (err, result) => {
        if (err) throw err;
        if (result) {
          let game = null;

          const details = {
            name: "",
            image: "",
            year: "",
            description: "",
            maxPlayers: "",
            minPlayers: "",
            publisher: "",
          };

          if (result.items && result.items.item) {
            game = result.items.item;
          } else if (result.item) {
            game = result.item;
          }

          if (game) {
            // Obtener el nombre del juego
            if (game.name && Array.isArray(game.name)) {
              const primaryName = game.name.find(
                (name) => name.$.type === "primary"
              );
              details.name = primaryName ? primaryName.$.value : "";
            } else if (game.name && game.name.$ && game.name.$.value) {
              details.name = game.name.$.value;
            }

            // Obtener la URL de la imagen del juego
            if (game.image) {
              details.image = game.image;
            }

            if (game.yearpublished) {
              details.year = game.yearpublished.$;
            }
            if (game.description) {
              let descriptionText= game.description;
              var txt = document.createElement("textarea");
              txt.innerHTML = descriptionText;
              details.description =txt.value;

            }
            if (game.maxplayers) {
              details.maxPlayers = game.maxplayers.$;
            }
            if (game.minplayers) {
              details.minPlayers = game.minplayers.$;
            }
            const boardgamepublisher = game.link.find(
              (link) => link.$.type === "boardgamepublisher"
            );
            if (boardgamepublisher) {
              details.publisher = boardgamepublisher.$.value;
            }
            setGameDetails(details);
            setLoading(false);
          }
        }
      });
    };

    getInfo(id);
  }, []);

  if (loading) {
    return (
      <Loading/>
    ) 
  }

  return (
    <div className="bg-orange-100 p-4">
  <h1 className="text-3xl mb-10 text-center ">{gameDetails.name}</h1>
  <img
    src={gameDetails.image}
    className="rounded-lg mx-auto mb-4"
    alt={gameDetails.name}
    style={{ maxHeight: "200px", objectFit: "contain" }}
  />
  <div className="flex justify-center mt-12">
  <div className="max-w-screen-lg w-full px-4">
    <p className="mb-4"><strong>Description:</strong> {gameDetails.description}</p>
    <p className="mb-4"><strong>Year of publication:</strong> {gameDetails.year.value}</p>
    <p className="mb-4"><strong>Players:</strong> {gameDetails.minPlayers.value} - {gameDetails.maxPlayers.value}</p>
    <p className="mb-4"><strong>Published by:</strong> {gameDetails.publisher}</p>

    {props.source === "searchPage" && (
      <ButtonComponent className="mt-4" buttonText="Add" idBoardgame={id} />
    )}

    <div>
      {props.source === "boardgamesPage" && (
        <FriendDetails id={id}/>
      )}
    </div>
  </div>
</div>
</div>
  );
};

export default DetailsPage;
