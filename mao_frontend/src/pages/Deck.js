import React from 'react';
import motion from 'framer-motion';
import "./Card.scss"
function DrawDeck(){
  const imageName = `flipped_card.jpg`;
  const imagePath = `./cards/${imageName}`;
  return(
    <motion.div className="deck">
        <img src = {imagePath} alt={""} className="card_image"/>
    </motion.div>
  )
}
export default DrawDeck;
class Card{
    constructor(imagePathway, isFlippedOver){
      this.imagePathway = imagePathway;
      this.isFlippedOver = isFlippedOver;
    }
    renderCard(givenStyle){
      const imageName = `${this.imagePathway}.png`;
      const imagePath = `./cards/${imageName}`;
      console.log()
      return(
        <div className="card" style={givenStyle}>
          <img src = {imagePath} alt={""} className="card_image"/>
        </div>
      )
    }
      // const imageName = `${theString}.png`;
      // const imagePath = `./cards/${imageName}`;
      // return (
      //   <div className="card">
      //     <img src = {imagePath} alt={theString} className="card_image"/>
      //   </div>
      // );
    }