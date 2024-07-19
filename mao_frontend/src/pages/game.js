import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./PlayerCard.tsx";
import topCard from "./topCard.js";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import{
   atom, 
   useAtomValue, 
   useAtom
} from 'jotai';
import {machineHandState, topCardState, playerHandState, isInitialMachineHand, isInitialPlayerHand} from "./GameStates.js";
import DrawDeck from './Deck.js';
//import {motion} from "framer-motion";
function Game(){
    
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const handleClick = () => {
        let changedArr = [...playerHand];
        if(playerHand.length < 6){
            changedArr.push("ace_of_spades");
        }
        setPlayerHand(changedArr);
    }
    const queryClient = new QueryClient();
    let navigate = useNavigate();
    return(
        <>
        <div className = "table">
            {/* {Hand(useAtomValue(machineHandState), true)} */}
            <button onClick={handleClick}>hello</button>
            {topCard(useAtomValue(topCardState))}
            {Hand(useAtomValue(playerHandState), false)}
        </div>
        </>
    );
}

export default Game;
