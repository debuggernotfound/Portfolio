import React from 'react';
import './Card.scss';
import {motion, Variants, AnimatePresence, stagger} from 'framer-motion';
import {machineHandState} from "./GameStates.js";
import {playerHandState} from "./GameStates.js";
import {useAtom, useAtomValue, useSetAtom } from 'jotai';
function PlayerCard(index, imagePathway, isFlippedOver, givenStyle, degreeRotation, RCAProxy){
  // const [active, setActive] = React.useState(false);
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
    return(
      <motion.div 
      initial={{rotate: degreeRotation, transformOrigin:tOrigin, width:0}}
      key={imagePathway}
      animate={{transition: {width: {delay: 1}}, rotate: degreeRotation, transformOrigin: tOrigin, width: `${100}px`}}
      whileHover={active || isFlippedOver ? {}:{rotate: degreeRotation, transformOrigin: tOrigin, translateY:-10}}
      onClick={() => [RCAProxy.i = {index, imagePathway, isFlippedOver}]}
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
