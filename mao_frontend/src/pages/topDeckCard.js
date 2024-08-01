import React from 'react';
import './Deck.css';
import './Card.scss';
import {motion} from 'framer-motion';
import { playerHandState, playerPlayedCardState, chatsInChatBoxState, lastIndexOfActionArrayState, machineHandState, topCardState} from './GameStates';
import { useAtom } from 'jotai';
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
    const initialGameURL = "http://localhost:3001/api/v1/game/";
    let changedPlayerHand = [...playerHand];
    let changedChatsArr = [...chatsInChatBox];
    const handleClick = async() => {
        console.log(playerPlayedCard);
        if(playerPlayedCard===""){
            console.log("look this is a draw move!");
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
                console.log(response.data);
                let updatedPlayerHand = response.data.updatedHand.at(0);
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
            let delay = Math.random()*2000 + 500;
            setTimeout(getMachineMove, delay);
        }
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
            console.log(changedChatsArr);
            setPlayerHand(changedPlayerHand);
            setChatsInChatBox(changedChatsArr);
            setLastIndexOfActionArray(changedChatsArr.length);
        });
        setPlayerPlayedCard("");
        setChatsInChatBox(changedChatsArr);
        setPlayerHand(changedPlayerHand);
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