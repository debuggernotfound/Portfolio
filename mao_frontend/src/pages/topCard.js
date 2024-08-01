import React from 'react';
import './topCard.css';
import { topCardState } from './GameStates';
import {useAtomValue} from 'jotai';
function TopCard(){
    const imageName = `${useAtomValue(topCardState)}.png`;
    const imagePath = `./cards/${imageName}`;
    console.log(imagePath);
    return(
        <div className = "topCard">
        <img src = {imagePath} alt={""} className="card_image"/>
        </div>
    )
}
export default TopCard;