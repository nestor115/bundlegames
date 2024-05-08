import React, { useState, useEffect } from "react";
import Game from "../components/Game";
import ButtonComponent from "../components/ButtonComponent";
import { useDatabase } from "../hooks/Database.jsx";
import Layout from "../components/Layout.jsx";

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
    <Layout showButtons={true}>
    <div className=" p-4">
  <h1 className="text-4xl mb-16 text-center">Boardgames Collection</h1>

  {/* <div className="mt-8 flex flex-wrap gap-4 justify-center">
    <ButtonComponent route={"/login"} buttonText={"Logout"} />
    <ButtonComponent route={"/search"} buttonText={"New boardgame"} />
    <ButtonComponent route={"/friends"} buttonText={"Friends"} />
  </div> */}

  <div className="flex flex-wrap gap-4 mt-4">
    {boardgameIds !== null ? (
      boardgameIds.map((boardgameId) => (
          <Game key={boardgameId} id={boardgameId} />
      ))
    ) : (
      <p>Loading</p>
    )}
  </div>
</div>
</Layout>
  );
};

export default BoardgamesPage;
