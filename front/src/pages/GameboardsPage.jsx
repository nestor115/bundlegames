import React from 'react';
import { Link } from 'react-router-dom';
import Game from '../components/Game';
import Logout from '../components/Logout';
import Prueba from '../components/Prueba';
const GameboardsPage = () => {
  

  return (
    <div>
      <h1>Juegos de Mesa</h1>
      
      <Logout/>
    

       
       <Game id="297318"/>
       <Game id="402206"/>
       <Game id="192291"/>
       <Game id="330517"/>
       <Game id="63975"/>
       <Game id="266667"/>
     
    </div>
  );
};

export default GameboardsPage;
