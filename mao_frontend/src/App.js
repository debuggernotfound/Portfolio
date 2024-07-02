import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getHelloMessage } from './apiService';
import Home from "./pages/home";
import Game from "./pages/game";
import End from "./pages/end";

function App() {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />}/>
        <Route path="/end" element={<End />}/>
      </Routes>
    </Router>

    </>

  );
}

export default App;

