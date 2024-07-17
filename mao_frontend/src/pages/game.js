import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./PlayerCard.tsx";
import topCard from "./topCard.js";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import{
   atom, 
   useAtomValue
} from 'jotai';
import {machineHandState, topCardState, playerHandState} from "./GameStates.js";
//import {motion} from "framer-motion";
function Game(){
    const queryClient = new QueryClient();
    let navigate = useNavigate();
    return(
        <>
        <div className = "table">
            {Hand(useAtomValue(machineHandState), true)}
            {topCard(useAtomValue(topCardState))}
            {Hand(useAtomValue(playerHandState), false)}
        </div>
        </>
    );
}

export default Game;
