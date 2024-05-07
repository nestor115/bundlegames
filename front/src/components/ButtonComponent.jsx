import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth.jsx";
import { useDatabase } from "../hooks/Database.jsx";

const ButtonComponent = (props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { deleteBoardgame, addBoardgame } = useDatabase();

  const handleClick = async () => {
    if (props.route === "/login" && props.buttonText != "Login") {
      logout();
    } else if (props.idBoardgame && props.buttonText == "Add") {
         await addBoardgame(props.idBoardgame);
         navigate("/boardgames");
    } else if (props.idBoardgame && props.buttonText == "Delete") {
      await deleteBoardgame(props.idBoardgame);
    //  console.log("hola")
    //  console.log(frase); 
    //  window.location.reload();
    }else{
      navigate(props.route);
    }
  };

  return (
    <button
    onClick={handleClick}
    className="bg-gray-300 hover:bg-gray-400 border border-gray-400 px-4 py-2 rounded-lg cursor-pointer"
  >
    
    {props.buttonText}
  </button>
);
};

export default ButtonComponent;
