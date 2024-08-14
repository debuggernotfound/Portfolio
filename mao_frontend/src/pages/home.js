import React, {useEffect} from 'react';
import axios from "axios";
import './home.css';
import {useNavigate} from 'react-router-dom';
import { gameIDState, playerHandState, topCardState, chatsInChatBoxState, chatBoxFilledState, lastRemovedCardState, playerPlayedCardState, machineHandState, urlUsed, lastIndexOfActionArrayState, tutorialStepState, tutorialSpeechTextState, speechBubblePositionState, speechBubbleButtonState, creditsShownState, machinePlayedCardState} from './GameStates';
import {useAtom, useAtomValue} from 'jotai';
import Credits from './Credits';
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
    const [lastIndexOfActionArray, setLastIndexOfActionArray] = useAtom(lastIndexOfActionArrayState);
    const [tutorialStep, setTutorialStep] = useAtom(tutorialStepState);
    const [tutorialSpeechText, setTutorialSpeechText] = useAtom(tutorialSpeechTextState);
    const [speechBubblePosition, setSpeechBubblePosition] = useAtom(speechBubblePositionState);
    const [speechBubbleButton, setSpeechBubbleButton] = useAtom(speechBubbleButtonState);
    const [creditsShown, setCreditsShown] = useAtom(creditsShownState);
    const [machinePlayedCard, setMachinePlayedCard] = useAtom(machinePlayedCardState);
    const initializeGameURL = useAtomValue(urlUsed);
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
        setMachinePlayedCard("");
    }
    const handleTutorialClick = () => {
        setTutorialStep(-1);
        setTutorialSpeechText("Welcome to the tutorial! Click the \"next\" button to begin.");
        setSpeechBubblePosition({'width':`${20}%`, 'top':`${4}%`, 'left':`${2}%`});
        setSpeechBubbleButton("Next");
        navigate("/tutorial")
    }
    const handleCreditClick = () => {
        setCreditsShown(true);
    }
    return(
        <div className="page">
            <div className = "title">MAO</div>
            <div className = "btn-container">
                <button className="btn" onClick={() => [handleClick()]}>PLAY</button>
                <button className="btn" onClick={handleTutorialClick}>RULES</button>
                <button className="btn" onClick={handleCreditClick}>CREDITS</button>
            </div>
            {creditsShown ? <Credits/> : null}   
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
