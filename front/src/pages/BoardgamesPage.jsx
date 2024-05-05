import React, { useState, useEffect } from "react";
import Game from "../components/Game";
import ButtonComponent from "../components/ButtonComponent";
import { useDatabase } from "../hooks/Database.jsx";

const BoardgamesPage = () => {
  const [boardgameIds, setBoardgameIds] = useState([]);
  const { getBoardgamesIds } = useDatabase();

  useEffect(() => {
    const getIds = async function () {
      const data = await getBoardgamesIds();
      // console.log(data.boardgame_ids);
      setBoardgameIds(data.boardgame_ids);
    };
    getIds();
  }, []);

  return (
    <div className="bg-orange-100 p-4">
  <h1 className="text-2xl mb-4">Juegos de Mesa</h1>

  <div className="flex flex-wrap gap-4">
    <ButtonComponent route={"/login"} buttonText={"Logout"} />
    <ButtonComponent route={"/search"} buttonText={"Añadir Juego"} />
    <ButtonComponent route={"/friends"} buttonText={"Amigos"} />
  </div>

  <div className="flex flex-wrap gap-4 mt-4">
    {boardgameIds !== null ? (
      boardgameIds.map((boardgameId) => (
          <Game key={boardgameId} id={boardgameId} />
      ))
    ) : (
      <p>Cargando</p>
    )}
  </div>
</div>
  );
};

export default BoardgamesPage;
