import React from "react";
import './topCard.css';
import { useAtom } from "jotai";
import { machinePlayedCardState } from "./GameStates";
function OverlayCard(){
    const[machinePlayedCard, setMachinePlayedCard] = useAtom(machinePlayedCardState);
    const imageName = `${machinePlayedCard}.jpg`;
    const imagePath = `./cards/${imageName}`;
    return(
        <motion.div 
        initial={{width:0}}
        style={givenStyle}
        animate={{transition:{width:{duration:0.2, delay:0.8}}, width:150}}
        transition={{type: "tween"}}
        className="topCard" 
        >
          <img
           src = {imagePath} alt={""} className="card_image"/>
        </motion.div>
    );
}
export default OverlayCard;