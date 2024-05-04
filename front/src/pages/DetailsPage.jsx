import React, { useState, useEffect } from "react";
import xml2js from "xml2js";
import { useParams } from "react-router-dom";
import { useApiBoardgames } from "../hooks/ApiBoardgames";
import ButtonComponent from "../components/ButtonComponent";
import { useDatabase } from "../hooks/Database";

const DetailsPage = (props) => {
  const { id } = useParams();
  const { getBoardGameInfo } = useApiBoardgames();
  const [gameDetails, setGameDetails] = useState(null);
  const [errors, setErrors] = useState("");
  const { getFriends, addPlayerFriend, getPlayerFriends, deletePlayerFriend } =
    useDatabase();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const [playerFriends, setPlayerFriends] = useState([]);
  const [selectedPlayerFriend, setSelectedPlayerFriend] = useState(null);

  useEffect(() => {
    const getAllFriends = async () => {
      const data = await getFriends();
      setFriends(data.friends);
    };
    getAllFriends();
  }, []);
  const handleFriendChange = (e) => {
    setSelectedFriend(e.target.value);
  };

  const handlePlayerFriendClick = (friendId) => {
    setSelectedPlayerFriend(friendId);
  };
  const handleDeletePlayerFriend = async () => {
    if (!selectedPlayerFriend) {
      alert("Selecciona un amigo para eliminarlo.");
      return;
    }
    try {
      await deletePlayerFriend(id,selectedPlayerFriend);
      setSelectedPlayerFriend(null);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };

  useEffect(() => {
    const getPlayerFriendsData = async () => {
      const data = await getPlayerFriends(id);
      setPlayerFriends(data.friends);
    };
    getPlayerFriendsData();
  }, [id]);

  const handleAddFriendToGame = async () => {
    if (!selectedFriend) {
      alert("Por favor, selecciona un amigo.");
      return;
    }
    try {
      await addPlayerFriend(id, selectedFriend);
      alert("Amigo añadido correctamente al juego de mesa.");
      window.location.reload();
    } catch (error) {
      console.error("Error al añadir amigo al juego de mesa:", error);
    }
  };

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
      <p>source:{props.source}</p>
      {props.source === "searchPage" && (
        <ButtonComponent buttonText="Añadir" idBoardgame={id} />
      )}
      <div>
        {props.source === "boardgamesPage" && (
          <div>
            <h1>Lista de Amigos</h1>
            <select value={selectedFriend} onChange={handleFriendChange}>
              <option value="">Selecciona un amigo</option>
              {friends.map((friend) => (
                <option key={friend.id} value={friend.id}>
                  {friend.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddFriendToGame}>
              Añadir Amigo al Juego
            </button>

            <div>
              <h1>Lista de Jugadores</h1>
              <ul>
                {Object.values(playerFriends).map((playerFriend) => (
                  <li
                    key={playerFriend.id}
                    style={{
                      color: playerFriend.id === selectedPlayerFriend ? "blue" : "black",
                    }}
                    onClick={() => handlePlayerFriendClick(playerFriend.id)}
                  >
                    {playerFriend.name}
                  </li>
                ))}
              </ul>
              <button onClick={handleDeletePlayerFriend}>
                Eliminar jugador Seleccionado
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
