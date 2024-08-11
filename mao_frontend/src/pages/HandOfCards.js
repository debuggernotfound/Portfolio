import {React, useEffect} from 'react';
import './HandOfCards.scss';
import PlayerCard from "./PlayerCard.tsx";
import { AnimatePresence, motion } from "framer-motion";
import {atom, useAtom, useAtomValue} from 'jotai';
import DrawDeck from './Deck.js';
import MachineCard from './MachineCard.js';
import { playerHandState, machineHandState, topCardState, lastRemovedCardState, playerPlayedCardState, chatsInChatBoxState} from './GameStates.js';
function Hand(cards, isMachine){
    let degreeIncrement = 0;
    let isMachineHand = isMachine;
    const handStyle = getHandStyle(isMachine);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [machineHand, setMachineHand] = useAtom(machineHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [lastRemovedCard, setLastRemovedCard] = useAtom(lastRemovedCardState);
    const [playerPlayedCard, setPlayerPlayedCard] = useAtom(playerPlayedCardState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const rcaProxy = new Proxy({}, {
      set(obj, property, value){
        let changedArr = [...playerHand];
        let index = value.index;
        let removedImagePath = value.imagePathway;
        console.log(removedImagePath);
        console.log(index);
        if(removedImagePath === "bad card played" && playerPlayedCard===""){
          let changedArr = [...chatsInChatBox];
          if(index === "suit"){
            changedArr.push({person: "Jerry the Machine", message: "Suit and value not matching with top card. Please pick another card.", messageStyle:{'left': `${2}%`}});
          }
          setChatsInChatBox(changedArr);
          return true;
        }
        let isFlipped = value.isFlippedOver;
        changedArr.splice(index, 1);
        if(playerPlayedCard === ""){
          setPlayerHand(changedArr);
          setLastRemovedCard(removedImagePath);
          setPlayerPlayedCard(removedImagePath);
        }
        return true;
      }
    });
    let hiddenFlippedCardDeck = new Array();
    if(isMachine){
      // for(let index = 0; index < numCardsIfMachine; index++){
      //   cards.push(" ");
      // }
      degreeIncrement = (cards.length < 8) ? 15 : 120/cards.length;
      cards = cards.map((s, index) => MachineCard(index, s, getCardStyle(cards.length, index, isMachine, degreeIncrement), getRotation(cards.length, index, degreeIncrement)));
    }
    else{
      degreeIncrement = (cards.length < 8) ? 15 : 120/cards.length;
      hiddenFlippedCardDeck = cards.map((s, index) => DrawDeck(false, getRotation(cards.length, index, degreeIncrement), index*2));
      cards = isMachine ? cards : cards.map((s, index) => PlayerCard(index, s, isMachineHand,getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy, topCard));
    }  
    //isMachineHand ? machineHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy)) : playerHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy));
    // const handleExit = () => {
    //   if(lastRemovedCard !== ""){
    //     setTopCard(lastRemovedCard);
    //     console.log("hello");
    //     console.log(lastRemovedCard);
    //   }
    // }
    const handleExit = () => {
      if(!isMachine){
        setTopCard(lastRemovedCard);
        let toSetPlayerPlayedCard = isMachine ? playerPlayedCard : lastRemovedCard;
        setPlayerPlayedCard(toSetPlayerPlayedCard);
      }
    }
    return(
      <motion.div className="hand" style={handStyle}>
      <AnimatePresence>
        {hiddenFlippedCardDeck}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => handleExit()}>
          {cards}
      </AnimatePresence>
      </motion.div>

    );
  }
  function getHandStyle(isMachine){
    let positioning = isMachine ? 2 : 72;  
    return{
      'top': `${positioning}%`
    }
  }
  function getCardStyle(length, i, isMachineHand, degreeIncrement){
    let hasPassedHalf = i > (length - 1) / 2;
      let posNeg = hasPassedHalf ? 1 : -1;
      let cardsAwayFromHalf = Math.abs(i - ((length - 1) / 2))
      let tOrigin = isMachineHand ? `top` : `center ${150}%`;
      return{
        'zIndex': i,
        'transform': `rotate(${posNeg*degreeIncrement*cardsAwayFromHalf}deg)`,
        'transformOrigin': tOrigin
      }
  }
  function getRotation(length, i, degreeIncrement){
    let hasPassedHalf = i > (length - 1) / 2;
    let posNeg = hasPassedHalf ? 1 : -1;
    let cardsAwayFromHalf = Math.abs(i - ((length - 1) / 2))
    return(
      posNeg*degreeIncrement*cardsAwayFromHalf
    );
  }
export default Hand;