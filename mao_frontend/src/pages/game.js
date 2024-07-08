import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import Card from "./Card.js";

function Game(){
    let navigate = useNavigate();
    let hand = ["ace_of_hearts", "king_of_spades", "king_of_spades", "two_of_hearts", "two_of_spades"];
    let handObject = new Hand(hand);
    return(
        <div>
            {handObject.render()}
        </div>
    );
}
export default Game;
