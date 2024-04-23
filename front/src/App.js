import './App.css';
import React from 'react';
import BoardgamesPage from './pages/BoardgamesPage';
import DetailsPage from './pages/DetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Configurar Axios para incluir cookies en las solicitudes
// axios.defaults.withCredentials = true;

function App() {
  return (

    <Router>
    <div>
      <Routes>
      <Route exact path="/" element={<DashboardPage/>} />
        <Route exact path="/boardgames" element={<BoardgamesPage/>} />
        <Route path="/game" element={<DetailsPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />

      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
