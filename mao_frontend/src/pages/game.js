import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./PlayerCard.tsx";
import topCard from "./topCard.js";
import topDeckCard from './topDeckCard.js';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import{
   atom, 
   useAtomValue, 
   useAtom
} from 'jotai';
import {machineHandState, topCardState, playerHandState, isInitialMachineHand, isInitialPlayerHand} from "./GameStates.js";
import DrawDeck from './Deck.js';
import ChatBox from './ChatBox.js';
//import {motion} from "framer-motion";
function Game(){
    const queryClient = new QueryClient(); 
    let navigate = useNavigate();
    return(
        <>
        <div className = "table">
            {ChatBox()}
            {Hand(new Array(), true, useAtomValue(machineHandState))}
            {topDeckCard()}
            {topCard(useAtomValue(topCardState))}
            {Hand(useAtomValue(playerHandState), false, 0)}
        </div>
        </>
    );
}

export default Game;
