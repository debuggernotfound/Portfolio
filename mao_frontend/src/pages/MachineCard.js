import React from 'react';
import {motion, stagger} from 'framer-motion';
import './Card.scss';

function MachineCard(index, givenStyle, degreeRotation){
let active = false;
let translateUpDown = 1;
let tOrigin =`center ${-30}%`;
const imageName = `flipped_card.jpg`;
const imagePath = `./cards/${imageName}`;
let toTranslateY = -245;
let toTranslateX = -50;
// }
return(
  <motion.div 
  initial={{rotate: 0, transformOrigin:tOrigin}}
  style={givenStyle}
  animate={{transition:{translateX:{duration:0.6, delay: 0.01*index}, translateY:{duration:0.6, delay: 0.01*index}, rotate:{delay:0.2 + 0.01*index, duration:0.4}, 
  width:{duration:0.2, delay:0.8}}, translateX: toTranslateX, translateY: toTranslateY, rotate:degreeRotation}}
  key={degreeRotation}
  exit={{rotate:0, translateY:-250, translateX: -10}}
  className="machine_card" 
  >
    <img
     src = {imagePath} alt={""} className="card_image"/>
  </motion.div>
)
}
export default MachineCard;