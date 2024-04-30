import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Game from '../components/Game';
import ButtonComponent from '../components/ButtonComponent';
import Prueba from '../components/Prueba';
import { useDatabase } from "../hooks/Database.jsx";

const BoardgamesPage = () => {
const [boardgameIds, setBoardgameIds] = useState([]);
const { getBoardgamesIds } = useDatabase();
 



useEffect(() => {

  const getIds = async function () {
    const data = await getBoardgamesIds();
    // console.log(data.boardgame_ids);
    setBoardgameIds(data.boardgame_ids);
  }
getIds();

}, []);



  return (
    <div>
      <h1>Juegos de Mesa</h1>
      
      <ButtonComponent route={'/login'} buttonText={'Logout'}/>
      <ButtonComponent route={'/search'} buttonText={'Añadir Juego'}/>
    


{boardgameIds !== null ? (
  boardgameIds.map((boardgameId)=>(
    // <p key={boardgameId}>{boardgameId}</p>
    <Game id={boardgameId} key={boardgameId}/>
  ))
) : (
    <p>Cargando</p>
)}




    {/* {boardgameIds.map((boardgameId)=>(
      <p key={boardgameId}>{boardgameId}</p>
      // <Game id={boardgameId} key={boardgameId}/>
    ))} */}
       

       
       {/* <Game id="297318"/>
       <Game id="402206"/>
       <Game id="192291"/>
       <Game id="330517"/>
       <Game id="63975"/>
       <Game id="266667"/> */}
     
    </div>
  );
};

export default BoardgamesPage;
