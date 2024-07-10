import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./Card.tsx";
//import {motion} from "framer-motion";

function Game(){
    let navigate = useNavigate();
    let machineHand = ["three_of_clubs", "three_of_spades", "quuen_of_hearts"];
    let playerHand = ["ace_of_hearts", "king_of_spades", "king_of_spades", "two_of_hearts", "two_of_spades"];
    for(let i = 0; i < 5; i++){
        playerHand.push("ace_of_spades");
        machineHand.push("ace_of_spades");
    }
    let playerHandObject = new Hand(playerHand, false);
    let machineHandObject = new Hand(machineHand, true);
    return(
        <div>
            <div>
                {machineHandObject.render()}
            </div>
            <div>
                {playerHandObject.render()}
            </div>
        </div>
    );
}
export default Game;
