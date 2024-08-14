import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getHelloMessage } from './apiService';
import Home from "./pages/home";
import Game from "./pages/game";
import End from "./pages/end";
import Tutorial from "./pages/Tutorial";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />}/>
        <Route path="/end" element={<End />}/>
        <Route path="/tutorial" element={<Tutorial />}/>
      </Routes>
    </Router>
    </QueryClientProvider>

  );
}

export default App;

