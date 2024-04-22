import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Game from '../components/Game';
import Logout from '../components/Logout';
import Prueba from '../components/Prueba';
const BoardgamesPage = () => {
const [boardgameIds, setBoardgameIds] = useState([]);

 


const getBoardgamesIds = async () => {
  try {
      const response = await axios.get('http://127.0.0.1:8000/user/boardgame-ids');
      setBoardgameIds(response.data.boardgame_ids);
  } catch (error) {
      console.error('Error al obtener los IDs de los juegos de mesa:', error);
  }
};
useEffect(() => {
   getBoardgamesIds();
}, []);

  return (
    <div>
      <h1>Juegos de Mesa</h1>
      
      <Logout/>
    
    {boardgameIds.map((boardgameId)=>(
      <p key={boardgameId}>{boardgameId}</p>
      // <Game id={boardgameId} key={boardgameId}/>
    ))}

       
       <Game id="297318"/>
       <Game id="402206"/>
       <Game id="192291"/>
       <Game id="330517"/>
       <Game id="63975"/>
       <Game id="266667"/>
     
    </div>
  );
};

export default BoardgamesPage;
