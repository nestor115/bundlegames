import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth.jsx";
import { useDatabase } from "../hooks/Database.jsx";

const ButtonComponent = (props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { deleteBoardgame, addBoardgame, getBoardgamesIds } = useDatabase();

  const handleClick = async () => {
    if (props.route === "/login" && props.buttonText === "Logout") {
      logout();
    } else if (props.idBoardgame && props.buttonText === "Add") {
      const response = await getBoardgamesIds();
      const boardgameIds = response.boardgame_ids;
      const boardgameIdParsed = parseInt(props.idBoardgame);

      if (boardgameIds.includes(boardgameIdParsed)) {
        alert("Este juego ya está en la lista.");
        return;
      }
      await addBoardgame(boardgameIdParsed);
      navigate("/boardgames");
    } else if (props.idBoardgame && props.buttonText === "Delete") {
      await deleteBoardgame(props.idBoardgame);
      window.location.reload();
    } else {
      navigate(props.route);
    }
  };

  if(props.isLink && props.buttonText ==="Logout"){
    return (
      <a
      onClick={handleClick}
      className="block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
    >
      {props.buttonText}
    </a>
    );
  }else if (props.isLink) {
    return (
      <a
      onClick={handleClick}
      href={props.route}
      className="block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      {props.buttonText}
    </a>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        className="bg-gray-300 hover:bg-gray-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer"
      >
        {props.buttonText}
      </button>
    );
  }
};

export default ButtonComponent;
