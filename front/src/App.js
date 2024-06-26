import './App.css';
import React from 'react';
import GameboardsPage from './pages/GameboardsPage';
import DetailsPage from './pages/DetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (

    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<GameboardsPage/>} />
        <Route path="/game" element={<DetailsPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />

      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
