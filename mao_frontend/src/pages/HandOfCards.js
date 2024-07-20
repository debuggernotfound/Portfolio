import {React, useEffect} from 'react';
import './HandOfCards.scss';
import PlayerCard from "./PlayerCard.tsx";
import { AnimatePresence, motion } from "framer-motion";
import {atom, useAtom} from 'jotai';
import DrawDeck from './Deck.js';
import MachineCard from './MachineCard.js';
import { playerHandState, machineHandState, topCardState, lastRemovedCardState, isInitialMachineHand, isInitialPlayerHand} from './GameStates.js';
function Hand(cards, isMachine, numCardsIfMachine){
    let degreeIncrement = 0;
    let isMachineHand = isMachine;
    const handStyle = getHandStyle(isMachine);
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [machineHand, setMachineHand] = useAtom(machineHandState);
    const [topCard, setTopCard] = useAtom(topCardState);
    const [lastRemovedCard, setLastRemovedCard] = useAtom(lastRemovedCardState);
    const rcaProxy = new Proxy({}, {
      set(obj, property, value){
        let changedArr = [...playerHand];
        let index = value.index;
        let removedImagePath = value.imagePathway;
        let isFlipped = value.isFlippedOver;
        changedArr.splice(index, 1);
        setPlayerHand(changedArr);
        setLastRemovedCard(removedImagePath);
        return true;
      }
    });
    let hiddenFlippedCardDeck = new Array();
    if(isMachine){
      degreeIncrement = (numCardsIfMachine < 8) ? 15 : 120/numCardsIfMachine;
      for(let i = 0; i < numCardsIfMachine; i++){
        cards.push(MachineCard(i, getCardStyle(numCardsIfMachine, i, isMachine), getRotation(numCardsIfMachine, i, degreeIncrement)));
      }
    }
    else{
      degreeIncrement = (cards.length < 8) ? 15 : 120/cards.length;
      hiddenFlippedCardDeck = cards.map((s, index) => DrawDeck(false, getRotation(cards.length, index, degreeIncrement), index*2));
      cards = isMachine ? cards : cards.map((s, index) => PlayerCard(index, s, isMachineHand,getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy));
    }  
    //isMachineHand ? machineHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy)) : playerHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy));
    
    return(
      <motion.div className="hand" style={handStyle}>
      <AnimatePresence>
        {hiddenFlippedCardDeck}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => setTopCard(lastRemovedCard)}>
          {cards}
      </AnimatePresence>
      </motion.div>

    );
  }
  function getHandStyle(isMachine){
    let positioning = isMachine ? 25: 608;  
    return{
      'top': `${positioning}px`
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