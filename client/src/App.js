import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./views/home/home";
import NavBar from "./components/navBar/navBar";
import LandingPage from "./views/landingPage/landingPage";
import LoadingScreen from "./components/LoadingScreen/loadingScreen";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loading" element={<LoadingScreen />} />
      </Routes>
    </div>
  );
}

export default App;
