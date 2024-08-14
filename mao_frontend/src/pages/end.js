import React from 'react';
import './home.css';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { gameIDState, playerHandState, topCardState, chatsInChatBoxState, chatBoxFilledState, lastRemovedCardState, playerPlayedCardState, machineHandState, urlUsed, lastIndexOfActionArrayState, tutorialStepState, tutorialSpeechTextState, speechBubblePositionState, speechBubbleButtonState, creditsShownState} from './GameStates';
import {useAtom, useAtomValue} from 'jotai';
function End(){
    let navigate = useNavigate();
    const [gameID, setGameID] = useAtom(gameIDState);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const [chatBoxFilled, setChatBoxFilled] = useAtom(chatBoxFilledState);
    const [lastRemovedCard, setLastRemovedCard] = useAtom(lastRemovedCardState);
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [machineHand, setMachineHand] = useAtom(machineHandState);
    const [lastIndexOfActionArray, setLastIndexOfActionArray] = useAtom(lastIndexOfActionArrayState);
    const [tutorialStep, setTutorialStep] = useAtom(tutorialStepState);
    const [tutorialSpeechText, setTutorialSpeechText] = useAtom(tutorialSpeechTextState);
    const [speechBubblePosition, setSpeechBubblePosition] = useAtom(speechBubblePositionState);
    const [speechBubbleButton, setSpeechBubbleButton] = useAtom(speechBubbleButtonState);
    const [creditsShown, setCreditsShown] = useAtom(creditsShownState);
    const initializeGameURL = useAtomValue(urlUsed);
    console.log(playerHand);
    let whoWon = playerHand.length==0 ? "YOU WON!" : "MACHINE WON";
    console.log("this is who won: " + whoWon);
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
        });
        await axios.get(initializeGameURL + "initial-machine-hand-number").then((response) => {
            let initialMachineHandState = [];
            for(let i = 0; i < response.data.initialNumber; i++){
                initialMachineHandState.push("flipped_card");
            }
            setMachineHand(initialMachineHandState);
            navigate("/game");
        });
        setChatBoxFilled("");
        setChatsInChatBox(new Array());
        setLastRemovedCard("");
        setPlayerPlayedCard("");
        setLastIndexOfActionArray(0);
    }
    return(
        <div className="end-page">
            <div className = "title">{whoWon}</div>
            <div className = "btn-container">
                <button className="end-btn" onClick={() => navigate("/")}>Go Home</button>
                <button className="end-btn" onClick={handleClick}>New Game</button>
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