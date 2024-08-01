import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { chatsInChatBoxState, lastIndexOfActionArrayState, machineHandState, playerHandState, playerPlayedCardState, topCardState} from './GameStates';
import './home.css'
import { useAtom, useAtomValue } from 'jotai';

function EndButton(){
    const initialGameURL = "http://localhost:3001/api/v1/game/";
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [lastIndexOfActionArray, setLastIndexOfActionArray] = useAtom(lastIndexOfActionArrayState);
    const [machineHand, setMachineHandState] = useAtom(machineHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    let changedChatsArr = [...chatsInChatBox];
    let changedPlayerHand = [...playerHand];
    console.log(lastIndexOfActionArray);
    const handleClick = async() => {
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
            console.log("here's the array in end button: " + updatedPlayerHand);
            let numOfCardsDrawn = updatedPlayerHand.pop();
            console.log("number of cards drawn: " + numOfCardsDrawn);
            for(let i = 0; i < numOfCardsDrawn; i++){
                changedPlayerHand.push(updatedPlayerHand.pop());
            }
            for(let i = 0; i < numOfCardsDrawn; i++){
                changedChatsArr.push({person: "Jerry the Machine", message: updatedPlayerHand.pop(), messageStyle:{'left': `${2}%`}});
                console.log("popped out a message");
            }
        });
        setPlayerHand(changedPlayerHand);
        setChatsInChatBox(changedChatsArr);
        setLastIndexOfActionArray(changedChatsArr.length);
        let delay = Math.random()*2000 + 500;
        setTimeout(getMachineMove, delay);
    }
    const getMachineMove = async() => {
        await axios.get(initialGameURL + "get-machine-move").then((response) => {
            let machineMove = response.data.machineMove.at(0);
            console.log("machine move: " + machineMove);
            let didMachinePlay = machineMove.pop();
            console.log("did machine play a card: " + didMachinePlay);
            if(didMachinePlay){
                let index = machineMove.pop();
                console.log("index: " + index);
                let cardMachinePlayed = machineMove.pop();
                console.log("here's the card the machine played: " + cardMachinePlayed);
                let toSetMachineHandState = [...machineHand];
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
                let toSetMachineHandState = [...machineHand];
                toSetMachineHandState.push("flipped_card");
                setMachineHandState(toSetMachineHandState);
            }
            setPlayerHand(changedPlayerHand);
            setChatsInChatBox(changedChatsArr);
            setLastIndexOfActionArray(changedChatsArr.length);
            setPlayerPlayedCard("");
        });
    }
    return(
        <button className="end_turn_button" onClick={handleClick}>
            End Turn
        </button>
    );
}
export default EndButton;