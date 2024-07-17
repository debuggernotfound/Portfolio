import React from 'react';
import './topCard.css';
function topCard(imagePathway){
    const imageName = `${imagePathway}.png`;
    const imagePath = `./cards/${imageName}`;
    return(
        <div className = "topCard">
        <img src = {imagePath} alt={""} className="card_image"/>
        </div>
    )
}
export default topCard;