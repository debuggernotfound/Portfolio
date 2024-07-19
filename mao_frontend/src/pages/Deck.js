import React from 'react';
import {motion} from 'framer-motion';
import "./Card.scss";
import "./Deck.css";
function DrawDeck(isMachine, degreeRotation, z_Index){
  const imageName = `flipped_card.jpg`;
  const imagePath = `./cards/${imageName}`;
  let toTranslateY = 260;
  let toTranslateX = -30;
  if(isMachine){
    toTranslateY = -toTranslateY;
  }
  return(
    <motion.div className="deck"
    style={{zIndex: z_Index}}
    initial={{width:`${100}px`}}
    animate={{transition:{translateX:{duration:0.6}, translateY:{duration:0.6}, rotate:{delay:0.4, duration:0.2}, width:{duration:0.2, delay:0.8}},
    translateX: toTranslateX, translateY: toTranslateY, rotate:degreeRotation, width:0}}
    >
        <img src = {imagePath} alt={""} className="card_image"/>
    </motion.div>
  )
}
export default DrawDeck;
