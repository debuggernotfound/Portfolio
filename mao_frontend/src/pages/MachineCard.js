import React from 'react';
import {motion, stagger} from 'framer-motion';
import './Card.scss';

function MachineCard(index, imagePathway, givenStyle, degreeRotation){
let active = false;
let translateUpDown = 1;
let tOrigin =`center ${-30}%`;
const imageName = `${imagePathway}.jpg`;
const imagePath = `./cards/${imageName}`;
let toTranslateY = -245;
let toTranslateX = -50;
console.log(index);
return(
  <motion.div 
  initial={{rotate: 0, transformOrigin:tOrigin}}
  style={givenStyle}
  animate={{transition:{translateX:{duration:0.6, delay: 0.01*index}, translateY:{duration:0.6, delay: 0.01*index}, rotate:{delay:0.2 + 0.01*index, duration:0.4}, 
  width:{duration:0.2, delay:0.8}}, translateX: toTranslateX, translateY: toTranslateY, rotate:degreeRotation}}
  key={index}
  exit={{transition:{width:{duration:0.2, delay:0.3}, rotate:{duration:0.3}, translateY:{duration:0.3}, translateX:{duration:0.3}}, rotate:0, translateY:-15, translateX:-90, width:0}}
  transition={{type: "tween"}}
  className="machine_card" 
  >
    <img
     src = {imagePath} alt={""} className="card_image"/>
  </motion.div>
)
}
export default MachineCard;