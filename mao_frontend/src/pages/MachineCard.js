import React from 'react';
import {motion} from 'framer-motion';
function MachineCard(index, imagePathway, givenStyle){
// const [active, setActive] = React.useState(false);
let active = false;
let translateUpDown = 1;
let tOrigin =`center ${-30}%`;
const imageName = `flipped_card.jpg`;
const imagePath = `./cards/${imageName}`;
// }
return(
  <motion.div 
  key={imagePathway}
  animate={"disabled"}
  style={givenStyle}
  exit={{rotate:0, translateY:-250}}
  className="card" 
  initial={{rotate: degreeRotation, transformOrigin:tOrigin}} 
  >
    <img
     src = {imagePath} alt={""} className="card_image"/>
  </motion.div>
)
}
export default MachineCard;