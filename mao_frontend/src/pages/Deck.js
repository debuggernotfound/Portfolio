import React from 'react';
class DrawDeck{
    constructor(topCard){
        this.topCard = topCard;
    }
    renderDrawDeck(){
        
    }
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