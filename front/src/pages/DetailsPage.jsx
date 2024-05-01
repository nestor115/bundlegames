import React, { useState, useEffect } from "react";
import xml2js from "xml2js";
import { useParams } from "react-router-dom";
import { useApiBoardgames } from "../hooks/ApiBoardgames";
import ButtonComponent from "../components/ButtonComponent";

const DetailsPage = () => {
  const { id } = useParams();
  const { getBoardGameInfo } = useApiBoardgames();
  const [gameDetails, setGameDetails] = useState(null);
  const [errors, setErrors] = useState("");

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
              details.description = game.description;
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
          }
        }
      });
    };

    getInfo(id);
  }, []);

  if (!gameDetails) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los detalles del juego
  }

  return (
    <div>
      <h2>Detalles del Juego</h2>
      <h3>{gameDetails.name}</h3>
      <img
        src={gameDetails.image}
        className="card-img-top"
        alt={gameDetails.name}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <p>ID del Juego: {id}</p>
      <p>Año de publicacion: {gameDetails.year.value}</p>
      <p>Descripcion: {gameDetails.description}</p>
      <p>
        players: {gameDetails.minPlayers.value}-{gameDetails.maxPlayers.value}
      </p>
      <p>Publicado por: {gameDetails.publisher}</p>
      <ButtonComponent buttonText="Añadir" idBoardgame={id}/>
    </div>
  );
};

export default DetailsPage;
