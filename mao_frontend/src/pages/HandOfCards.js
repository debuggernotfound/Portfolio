import {React, useEffect} from 'react';
import './HandOfCards.scss';
import Card from "./Card.tsx";
import { AnimatePresence, motion } from "framer-motion";
import {useAtom} from 'jotai';
import { playerHandState, machineHandState} from './GameStates.js';
function Hand(cards, isMachine){
    let degreeIncrement = (cards.length < 12) ? 15 : 180/cards.length;
    let isMachineHand = isMachine;
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const [machineHand, setMachineHand] = useAtom(machineHandState);
    let removedCard = "";
    const rcaProxy = new Proxy({}, {
      set(obj, property, value){
        let changedArr = [...playerHand];
        let index = value.index;
        let imagePath = value.imagePathway;
        let isFlipped = value.isFlippedOver;
        cards.splice(index, 1);
        changedArr.splice(index, 1);
        setPlayerHand(changedArr);
        return true;
      }
    });
    cards = isMachineHand ? machineHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy)) : playerHand.map((s, index) => Card(false, index, s, isMachineHand, getCardStyle(cards.length, index, isMachineHand, degreeIncrement), getRotation(cards.length, index, degreeIncrement), rcaProxy));
    return(
      <motion.div className="hand">
      <AnimatePresence mode="popLayout">
          {cards}
      </AnimatePresence>
      </motion.div>

    );
  }
  function getCardStyle(length, i, isMachineHand, degreeIncrement){
    let hasPassedHalf = i > (length - 1) / 2;
      let posNeg = hasPassedHalf ? 1 : -1;
      let cardsAwayFromHalf = Math.abs(i - ((length - 1) / 2))
      let tOrigin = isMachineHand ? `top` : `center ${150}%`;
      console.log(tOrigin);
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