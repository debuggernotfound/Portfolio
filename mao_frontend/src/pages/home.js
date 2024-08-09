import React, {useEffect} from 'react';
import axios from "axios";
import './home.css';
import {useNavigate} from 'react-router-dom';
import { gameIDState, playerHandState, topCardState, chatsInChatBoxState, chatBoxFilledState, lastRemovedCardState, playerPlayedCardState, machineHandState} from './GameStates';
import {useAtom, useAtomValue} from 'jotai';
function Home(){
    let navigate = useNavigate();
    const [gameID, setGameID] = useAtom(gameIDState);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const [chatBoxFilled, setChatBoxFilled] = useAtom(chatBoxFilledState);
    const [lastRemovedCard, setLastRemovedCard] = useAtom(lastRemovedCardState);
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [machineHand, setMachineHand] = useAtom(machineHandState);
    const initializeGameURL = "http://localhost:3001/api/v1/game/";
    const handleClick = async() => {
        await axios.get(initializeGameURL).then((response) => {
            let givenGameID = response.data.gameID;
            setGameID(givenGameID);
        });
        await axios.get(initializeGameURL + "initial-player-hand").then((response) => {
            let pHandArr = response.data.playerHand;
            setPlayerHand(pHandArr);
            console.log(playerHand);
        });
        await axios.get(initializeGameURL + "get-top-card").then((response) => {
            let topCardImagePathway = response.data.imagePathway;
            setTopCard(topCardImagePathway);
            navigate("/game");
        });
        await axios.get(initializeGameURL + "initial-machine-hand-number").then((response) => {
            let initialMachineHandState = [];
            for(let i = 0; i < response.data.initialNumber; i++){
                initialMachineHandState.push("flipped_card");
            }
            setMachineHand(initialMachineHandState);
        });
        setChatBoxFilled("");
        setChatsInChatBox(new Array());
        setLastRemovedCard("");
        setPlayerPlayedCard("");
        
    }
    return(
        <div className="page">
            <div className = "title">Mao</div>
            <button className="btn" onClick={() => [handleClick()]}>Play</button>
            <button className="btn">Rules</button>
        </div>
    );
}
// async function handleClick(){
//     const initializeGameURL = "http://localhost:3001/api/v1/game/";
//     await axios.get(initializeGameURL).then((response) => {
//         console.log(response.data.data);
//     });
// };
async function initializeServerGame(){
    let returned = await fetch('http://localhost:3001/initialize-game');
    return true;
}
export default Home;
