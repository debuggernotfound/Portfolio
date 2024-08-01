import React, {useEffect} from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./PlayerCard.tsx";
import TopCard from "./topCard.js";
import topDeckCard from './topDeckCard.js';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import{
   atom, 
   useAtomValue, 
   useAtom
} from 'jotai';
import {machineHandState, topCardState, playerHandState, gameIDState, lastRemovedCardState} from "./GameStates.js";
import DrawDeck from './Deck.js';
import ChatBox from './ChatBox.tsx';
import EndButton from './endButton.js';
import axios from "axios";
//import {motion} from "framer-motion";
function Game(){
    const queryClient = new QueryClient(); 
    let navigate = useNavigate();
    let machineHand = useAtomValue(machineHandState);
    let playerHand = useAtomValue(playerHandState);
    if(machineHand == 0 || playerHand.length == 0){
        navigate("/end");
    }
    return(
        <>
        <div className = "table">
            {ChatBox()}
            {Hand(useAtomValue(machineHandState), true)}
            {topDeckCard()}
            {TopCard()}
            {Hand(useAtomValue(playerHandState), false)}
            {EndButton()}
        </div>
        </>
    );
}

export default Game;
