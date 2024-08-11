import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
import { playerHandState, whoWonState } from './GameStates';
import { useAtom, useAtomValue } from 'jotai';
function End(){
    let navigate = useNavigate();
    const playerHand = useAtomValue(playerHandState);
    console.log(playerHand);
    let whoWon = playerHand.length==0 ? "YOU WON!" : "MACHINE WON";
    console.log("this is who won: " + whoWon);
    return(
        <div className="end-page">
            <div className = "title">{whoWon}</div>
            <div className = "btn-container">
                <button className="end-btn" onClick={() => navigate("/")}>Go Home</button>
                <button className="end-btn" onClick={() => navigate("/")}>New Game</button>
            </div>
            {/* <button className="btn" onClick={() => [initializeServerGame(), navigate("/game")]}>Play</button>
            <button className="btn">Rules</button> */}
        </div>
    );
}
// async function initializeServerGame(){
//     let returned = await fetch('http://localhost:3001/initialize-game');
//     return true;
// }
export default End;