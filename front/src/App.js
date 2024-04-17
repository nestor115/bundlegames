import './App.css';
import React from 'react';
import GameboardsPage from './components/GameboardsPage';
import DetailsPage from './components/DetailsPage';
import DashboardPage from './components/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (

    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<GameboardsPage/>} />
        <Route path="/game" element={<DetailsPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />

      </Routes>
    </div>
  </Router>
    
    
  );
}

export default App;
