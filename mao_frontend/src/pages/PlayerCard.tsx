import React from 'react';
import './Card.scss';
import {motion, Variants, AnimatePresence, stagger, animate} from 'framer-motion';
import {machineHandState, playerHandState, lastRemovedCardState} from "./GameStates.js";
import {useAtom, useAtomValue, useSetAtom } from 'jotai';
function PlayerCard(index, imagePathway, isFlippedOver, givenStyle, degreeRotation, RCAProxy, topCard){
    let tempImagePathway = imagePathway;
    let valueOfCard = tempImagePathway.substring(0, tempImagePathway.indexOf("_"));
    tempImagePathway = tempImagePathway.substring(tempImagePathway.indexOf("_") + 1, tempImagePathway.length);
    let suitOfCard = tempImagePathway.substring(tempImagePathway.indexOf("_") + 1, imagePathway.length);
    let active = false;
    let translateUpDown = isFlippedOver ? 1:-1
    let tOrigin = isFlippedOver ? `center ${-30}%` : `center ${150}%`;
    let whileHoverConstant = isFlippedOver ? 0 : 20*translateUpDown
    const container: Variants = {
      active: {rotate:0, translateY:-300, width:`${100}px`},
      disabled: {transition:{delay: 0.5}, rotate: degreeRotation, transformOrigin: tOrigin, width: `${100}px`},
      hover: {rotate: degreeRotation, transformOrigin: tOrigin, translateY:10}
    };
    const imageName = isFlippedOver ? `flipped_card.jpg`: `${imagePathway}.png`;
    const imagePath = `./cards/${imageName}`;
    // if(isRemovedCard){
    //   console.log("returned");
    //   return(
    //     <motion.div 
    //     initial = {{rotate: degreeRotation, transformOrigin: tOrigin}}
    //     animate={{rotate:0, translateY:-300}}
    //     className="card" 
    //     >
    //       <img
    //        src = {imagePath} alt={""} className="card_image"/>
    //     </motion.div>
    //   )
    // }
    // const handleClick = () => {
    //   setPlayerHand(prevHand => {
    //     const nHand = [...prevHand];
    //     nHand.splice(index, 1);
    //     return nHand
    //   })
    //   setActive(true);
    // }
    const handleClick = () => {
      //handle image pathway of top card
      let valueOfTopCard = topCard.substring(0, topCard.indexOf("_"));
      topCard = topCard.substring(topCard.indexOf("_") + 1, topCard.length);
      let suitOfTopCard = topCard.substring(topCard.indexOf("_") + 1, topCard.length);
      console.log("suit of top card: " + suitOfTopCard + " value of top card: " + valueOfTopCard + " suit of card: " + suitOfCard + " value of card: " + valueOfCard);
      if(!(suitOfCard !== suitOfTopCard && valueOfTopCard !== valueOfCard)){
        RCAProxy.i = {index, imagePathway, isFlippedOver};
        console.log("contacted proxy");
      }
      else{
        let messageToProxy = "bad card played";
        let suitOrValueNotMatching = suitOfCard !== suitOfTopCard ? "suit" : "value";
        RCAProxy.i = {index: suitOrValueNotMatching, imagePathway: "bad card played", isFlippedOver};
        console.log("improper card played");
      }
    }
    return(
      <motion.div 
      initial={{rotate: degreeRotation, transformOrigin:tOrigin, width:0}}
      key={imagePathway}
      animate={{transition: {width: {delay: 1}}, rotate: degreeRotation, transformOrigin: tOrigin, width: `${100}px`}}
      whileHover={active || isFlippedOver ? {}:{rotate: degreeRotation, transformOrigin: tOrigin, translateY:-10}}
      onClick={() => [handleClick()]}
      style={givenStyle}
      transition={{type: "tween"}}
      exit={{rotate:0, translateY:-240, translateX:-86}}
      className="card" 
      >
        <img
         src = {imagePath} alt={""} className="card_image"/>
      </motion.div>
    )
  }
export default PlayerCard;
