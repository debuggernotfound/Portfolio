import React from 'react';
import './Deck.css';
import './Card.scss';
import {motion} from 'framer-motion';
import { playerHandState, playerPlayedCardState, chatsInChatBoxState, lastIndexOfActionArrayState, machineHandState, topCardState, urlUsed, whoWonState, machinePlayedCardState} from './GameStates';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';
function TopDeckCard(){
    const imageName = `flipped_card.jpg`;
    const imagePath = `./cards/${imageName}`;
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const [lastIndexOfActionArray, setLastIndexOfActionArray] = useAtom(lastIndexOfActionArrayState);
    const [machineHand, setMachineHandState] = useAtom(machineHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [machinePlayedCard, setMachinePlayedCard] = useAtom(machinePlayedCardState);
    const [whoWon, setWhoWon] = useAtom(whoWonState);
    const initialGameURL = useAtomValue(urlUsed);
    let changedPlayerHand = [...playerHand];
    let changedChatsArr = [...chatsInChatBox];
    let isPlayersTurn;
    const handleClick = async() => {
        console.log(playerPlayedCard);
        if(playerPlayedCard===""){
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
                    "playedCard": "draw"
                }
            }).then((response) => {
                let updatedPlayerHand = response.data.updatedHand.at(0);
                isPlayersTurn = updatedPlayerHand.pop();
                console.log(updatedPlayerHand);
                let numOfCardsDrawn = updatedPlayerHand.pop();
                for(let i = 0; i < numOfCardsDrawn; i++){
                    changedPlayerHand.push(updatedPlayerHand.pop());
                }
                for(let i = 0; i < numOfCardsDrawn - 1; i++){
                    changedChatsArr.push({person: "Jerry the Machine", message: updatedPlayerHand.pop(), messageStyle:{'left': `${2}%`}});
                }
            });
            setPlayerPlayedCard("drew");
            setChatsInChatBox(changedChatsArr);
            setPlayerHand(changedPlayerHand);
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
            console.log("did machine play a card: " + didMachinePlay);
            if(didMachinePlay){
                let index = machineMove.pop();
                console.log("index: " + index);
                let cardMachinePlayed = machineMove.pop();
                console.log("here's the card the machine played: " + cardMachinePlayed);
                toSetMachineHandState = [...machineHand];
                console.log(toSetMachineHandState);
                toSetMachineHandState.splice(index, 1);
                setMachineHandState(toSetMachineHandState);
                setMachinePlayedCard(cardMachinePlayed);
                // setTopCard(cardMachinePlayed);
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
    }
    return(
        <motion.div 
        onClick={handleClick}
        className = "deck">
            <img src = {imagePath} alt={""} className="card_image"/>
        </motion.div>
    )
}
export default TopDeckCard;