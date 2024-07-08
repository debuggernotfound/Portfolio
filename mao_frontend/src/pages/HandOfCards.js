import React from 'react';
import './HandOfCards.scss';
import Card from "./Card.js";

class Hand{
  constructor(listOfCards){
    this.cards = new Array();
    for(let i = 0; i < listOfCards.length; i++){
      console.log(listOfCards.at(i));
      let tempCard = new Card(listOfCards.at(i), false);
      this.cards.push(tempCard);
    }
    this.degreeIncrement = (this.cards.length < 12) ? 15 : 180/this.cards.length;
    console.log(this.cards.length > 10);
    console.log(this.degreeIncrement);
  }
  addCards(listToAdd){

  }
  getStyle(i){
    let hasPassedHalf = i > (this.cards.length - 1) / 2;
    let posNeg = hasPassedHalf ? 1 : -1;
    let cardsAwayFromHalf = Math.abs(i - ((this.cards.length - 1) / 2))
    return{
      'zIndex': i,
      'transform': `translate(-50%, 50%) rotate(${posNeg*this.degreeIncrement*cardsAwayFromHalf}deg)`
    }
  }
  render(){
    let currCards = this.cards;
    return(
      <div className="hand">
        {currCards = currCards.map((c, index) => c.renderCard(this.getStyle(index)))};
      </div>
    );
  }
  //document.documentElement.style.setProperty('--numCardsInHand', cards.length);
  // document.documentElement.style.setProperty("--num-card", cards.length);
  // return (
  //   <div className="hand">
  //     {cards = cards.map((s, index) => (<Card theString={s} index={index}/>))}
  //   </div>
  // );
}
export default Hand;