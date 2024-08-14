import React from 'react';
import {motion} from 'framer-motion';
import "./Card.scss";
import "./Deck.css";
import { machinePlayedCardState } from './GameStates';
import { useAtomValue } from 'jotai';
function DrawDeck(isMachine, degreeRotation, z_Index, imagePathway){
  // const imageName = imagePathway;
  const imageName = "flipped_card.jpg"
  const imagePath = `./cards/${imageName}`;
  let toTranslateY = 245;
  let toTranslateX = -30;
  const initialWidth = isMachine ? 0 : 100;
  const finalWidth = isMachine ? 100 : 0; 
  if(isMachine){
    toTranslateY = -toTranslateY;

  }
  return(
    <motion.div className="deck"
    style={{zIndex: z_Index}}
    initial={{width:`${initialWidth}px`}}
    animate={{transition:{translateX:{duration:0.6, delay: 0.01*z_Index}, translateY:{duration:0.6, delay: 0.01*z_Index}, rotate:{delay:0.2 + 0.01*z_Index, duration:0.4}, 
    width:{duration:0.2, delay:0.8}}, translateX: toTranslateX, translateY: toTranslateY, rotate:degreeRotation, width:0}}
    exit={{transition:{duration:0.1}, width:`${finalWidth}px`, rotate:0, translateY:-15, translateX:-90,}}
    // animate={{transition:{translateX:{duration:0.6}, translateY:{duration:0.6}, rotate:{delay:0.2, duration:0.4}, width:{duration:0.2, delay:0.8}},
    // translateX: toTranslateX, translateY: toTranslateY, rotate:degreeRotation, width:0}}
    >
        <img src = {imagePath} alt={""} className="card_image"/>
    </motion.div>
  )
}
export default DrawDeck;
