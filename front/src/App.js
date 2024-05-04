import "./App.css";
import React from "react";
import BoardgamesPage from "./pages/BoardgamesPage";
import DetailsPage from "./pages/DetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FriendsPage from "./pages/FriendsPage";

// Configurar Axios para incluir cookies en las solicitudes
// axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/boardgames" element={<BoardgamesPage />} />
          <Route path="/boardgames/:id" element={<DetailsPage source="boardgamesPage"/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/game/:id" element={<DetailsPage source="searchPage"/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
