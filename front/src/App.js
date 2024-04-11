import './App.css';
import React from 'react';
import Game from './components/Game';
import GameboardsPage from './components/GameboardsPage';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (

    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<GameboardsPage/>} />
        <Route path="/game" element={<DetailsPage/>} />
      </Routes>
    </div>
  </Router>
    
    // <div>
    //   <h1>Titulo</h1>
    //   <Game id="297318"/>
    //   <Game id="402206"/>
    //   <Game id="192291"/>
    //   <Game id="330517"/>
    //   <Game id="63975"/>
    //   <Game id="266667"/>
    // </div>
  );
}

export default App;
