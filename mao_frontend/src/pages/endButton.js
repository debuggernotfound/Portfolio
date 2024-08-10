import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { chatsInChatBoxState, lastIndexOfActionArrayState, machineHandState, playerHandState, playerPlayedCardState, topCardState, urlUsed, whoWonState} from './GameStates';
import './home.css'
import { useAtom, useAtomValue } from 'jotai';

function EndButton(){
    const initialGameURL = useAtomValue(urlUsed);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [lastIndexOfActionArray, setLastIndexOfActionArray] = useAtom(lastIndexOfActionArrayState);
    const [machineHand, setMachineHandState] = useAtom(machineHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [whoWon, setWhoWon] = useAtom(whoWonState);
    let navigate = useNavigate();
    let clickNumber = 0;
    let changedChatsArr = [...chatsInChatBox];
    let changedPlayerHand = [...playerHand];
    let toSetMachineHandState = [...machineHand];
    let isPlayersTurn = true;
    const waiting = () => {
        console.log("waited");
    };
    console.log(lastIndexOfActionArray);
    const handleClick = async() => {
        if(playerPlayedCard !== ""){
            await axios({
                method:"post",
                url: initialGameURL + "update-player-hand",
                headers:{
                    'Content-Type':'application/json'
                },
                data:
                {
                    "lastIndex": lastIndexOfActionArray, 
                    "messagesSent": chatsInChatBox, 
                    "playedCard": playerPlayedCard
                }
            }).then((response) => {
                console.log(response.data.updatedHand);
                let updatedPlayerHand = response.data.updatedHand.at(0);
                isPlayersTurn = updatedPlayerHand.pop();
                let numOfCardsDrawn = updatedPlayerHand.pop();
                console.log("number of cards drawn: " + numOfCardsDrawn);
                for(let i = 0; i < numOfCardsDrawn; i++){
                    changedPlayerHand.push(updatedPlayerHand.pop());
                }
                for(let i = 0; i < numOfCardsDrawn; i++){
                    changedChatsArr.push({person: "Jerry the Machine", message: updatedPlayerHand.pop(), messageStyle:{'left': `${2}%`}});
                    console.log("popped out a message");
                }
                if(updatedPlayerHand.length > 0){
                    let playerPlayedSeven = updatedPlayerHand.pop();
                    if(playerPlayedSeven){
                        toSetMachineHandState.push("flipped_card");
                    }
                }
            });
            if(changedPlayerHand.length == 0){
                setPlayerHand(changedPlayerHand);
                navigate("/end");
            }
            else{
                if(isPlayersTurn){
                    setPlayerHand(changedPlayerHand);
                    setChatsInChatBox(changedChatsArr);
                    setLastIndexOfActionArray(changedChatsArr.length);
                    setPlayerPlayedCard("");
                }
                while(!isPlayersTurn){
                    await getMachineMove();
                }
            }
        }
    }
    const getMachineMove = async() => {
        let delay = Math.random()*2000 + 500;
        let delayForMachineWin = 0;
        await new Promise(res => setTimeout(res, delay));
        await axios.get(initialGameURL + "get-machine-move").then((response) => {
            let machineMove = response.data.machineMove.at(0);
            isPlayersTurn = machineMove.pop();
            console.log("machine move: " + machineMove);
            let didMachinePlay = machineMove.pop();
            let toSetMachineHandState = [...machineHand];
            if(didMachinePlay){
                let index = machineMove.pop();
                console.log("index: " + index);
                let cardMachinePlayed = machineMove.pop();
                console.log("here's the card the machine played: " + cardMachinePlayed);
                toSetMachineHandState = [...machineHand];
                console.log(toSetMachineHandState);
                toSetMachineHandState.splice(index, 1);
                setMachineHandState(toSetMachineHandState);
                setTopCard(cardMachinePlayed);
                let totalMessages = machineMove.length;
                console.log(totalMessages);
                for(let i = 0; i < totalMessages; i++){
                    changedChatsArr.push({person: "Jerry the Machine", message: machineMove.pop(), messageStyle: {'left': `${2}%`}});
                }
            }
            else{
                toSetMachineHandState.push("flipped_card");
                setMachineHandState(toSetMachineHandState);
            }
            if(toSetMachineHandState.length == 0){
                setWhoWon("MACHINE");
                delayForMachineWin = 500;
            }
            else{
                if(isPlayersTurn){
                    setPlayerHand(changedPlayerHand);
                    setChatsInChatBox(changedChatsArr);
                    setLastIndexOfActionArray(changedChatsArr.length);
                    setPlayerPlayedCard("");
                }
            }
        });
        if(delayForMachineWin > 0){
            await new Promise(res => (res, delayForMachineWin)).then(navigate("/end"));
        }
    }
    return(
        <button className="end_turn_button" onClick={handleClick}>
            End Turn
        </button>
    );
}
export default EndButton;