import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./Card.tsx";
import Table from "./Table.js"
import{
   atom, 
   useAtom
} from 'jotai';
//import {motion} from "framer-motion";
function Game(){
    let navigate = useNavigate();
    // const playerHand = ["ace_of_hearts", "king_of_spades", "king_of_spades", "two_of_hearts", "two_of_spades"];
    // for(let i = 0; i < 5; i++){
    //     playerHand.push("ace_of_spades");
    //     machineHand.push("ace_of_spades");
    // }
    return(
        <Table />
        // <div>{Hand(machineHand, true)}{Hand(playerHand, false)}</div>
    );
}

export default Game;
