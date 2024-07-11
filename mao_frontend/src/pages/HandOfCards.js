import {React, useEffect} from 'react';
import './HandOfCards.scss';
import Card from "./Card.tsx";
import { motion } from "framer-motion";
function Hand(cards, isMachine){
  // constructor(listOfCards, isMachine){
  //   this.cards = new Array();
  //   for(let i = 0; i < listOfCards.length; i++){
  //     // console.log(listOfCards.at(i));
  //     // let tempCard = new Card(listOfCards.at(i), isMachine);
  //     // this.cards.push(tempCard);
  //     this.cards.push(listOfCards.at(i));
  //   }
    let degreeIncrement = (cards.length < 12) ? 15 : 180/cards.length;
    let isMachineHand = isMachine;
    // console.log(this.cards.length > 10);
    // console.log(this.degreeIncrement);
    // let removedCards = new Array();
    // if(this.removedCards.length > 0){
    //   let index = this.removedCards.at(0);
    //   this.cards = this.cards.splice(index, 1);
    //   {this.cards = this.cards.map((s, index) => Card(index, s, this.isMachineHand, this.getCardStyle(index), this.getRotation(index), this.removedCards))};
    // }
    cards = cards.map((s, index) => Card(index, s, isMachineHand, getCardStyle(cards, index, isMachineHand, degreeIncrement), getRotation(cards, index, degreeIncrement)));
    return(
      <motion.div className="hand">
        {cards}
      </motion.div>
    );
  }
  //document.documentElement.style.setProperty('--numCardsInHand', cards.length);
  // document.documentElement.style.setProperty("--num-card", cards.length);
  // return (
  //   <div className="hand">
  //     {cards = cards.map((s, index) => (<Card theString={s} index={index}/>))}
  //   </div>
  // );
  function getCardStyle(cards, i, isMachineHand, degreeIncrement){
    let hasPassedHalf = i > (cards.length - 1) / 2;
      let posNeg = hasPassedHalf ? 1 : -1;
      let cardsAwayFromHalf = Math.abs(i - ((cards.length - 1) / 2))
      let tOrigin = isMachineHand ? `top` : `center ${150}%`;
      console.log(tOrigin);
      return{
        // 'zIndex': i,
        // 'transform': `translate(-50%, 50%) rotate(${posNeg*this.degreeIncrement*cardsAwayFromHalf}deg)`
        'zIndex': i,
        'transform': `rotate(${posNeg*degreeIncrement*cardsAwayFromHalf}deg)`,
        'transformOrigin': tOrigin
      }
  }
  function getRotation(cards, i, degreeIncrement){
    let hasPassedHalf = i > (cards.length - 1) / 2;
    let posNeg = hasPassedHalf ? 1 : -1;
    let cardsAwayFromHalf = Math.abs(i - ((cards.length - 1) / 2))
    return(
      posNeg*degreeIncrement*cardsAwayFromHalf
    );
  }
export default Hand;
// import React from 'react';
// import './HandOfCards.scss';
// import Card from "./Card.js";
// import { motion } from "framer-motion";

// class Hand{
//   constructor(listOfCards, isMachine){
//     this.cards = new Array();
//     for(let i = 0; i < listOfCards.length; i++){
//       this.cards.push(listOfCards.at(i));
//       console.log(listOfCards.at(i));
//       let tempCard = new Card(listOfCards.at(i), isMachine);
//       this.cards.push(tempCard);
//     }
//     this.degreeIncrement = (this.cards.length < 12) ? 15 : 180/this.cards.length;
//     this.isMachineHand = isMachine;
//     console.log(this.cards.length > 10);
//     console.log(this.degreeIncrement);
//   }
//   addCards(listToAdd){

//   }
//   getCardStyle(i){
//     let hasPassedHalf = i > (this.cards.length - 1) / 2;
//     let posNeg = hasPassedHalf ? 1 : -1;
//     let cardsAwayFromHalf = Math.abs(i - ((this.cards.length - 1) / 2))
//     let tOrigin = this.isMachineHand ? `top` : `center ${150}%`;
//     console.log(tOrigin);
//     return{
//       // 'zIndex': i,
//       // 'transform': `translate(-50%, 50%) rotate(${posNeg*this.degreeIncrement*cardsAwayFromHalf}deg)`
//       'zIndex': i,
//       'transform': `rotate(${posNeg*this.degreeIncrement*cardsAwayFromHalf}deg)`,
//       'transformOrigin': tOrigin
//     }
//   }
//   getHandStyle(isMachineHand){
    
//   }
//   getRotation(i){
//     let hasPassedHalf = i > (this.cards.length - 1) / 2;
//     let posNeg = hasPassedHalf ? 1 : -1;
//     let cardsAwayFromHalf = Math.abs(i - ((this.cards.length - 1) / 2))
//     return(
//       posNeg*this.degreeIncrement*cardsAwayFromHalf
//     );
//   }
//   render(){
//     let currCards = this.cards;
//     return(
//       <motion.div drag className="hand">
//         {currCards = currCards.map((c, index) => c.renderCard(this.getCardStyle(index, this.isMachineHand), this.getRotation(index)))};
//       </motion.div>
//     );
//   }
//   // render(){
//   //   let currCards = this.cards;
//   //   console.log(currCards);
//   //   let c = new Card("queen_of_spades", false);
//   //   console.log(c.getImagePathway());
//   //   console.log(this.getCardStyle(0));
//   //   console.log(this.getRotation(0));
//   //   this.cards.map((c, index) => ())
//   //   //card.renderCard(this.getCardStyle(index), this.getRotation(index))
//   // ;
//   //   return(
//   //     <div className="hand">
//   //       {/* {currCards = currCards.map((card, index) => card.renderCard(this.getCardStyle(index), this.getRotation(index)))}; */}
//   //       {currCards}
//   //     </div>
//   //   );
//   // }
//   //document.documentElement.style.setProperty('--numCardsInHand', cards.length);
//   // document.documentElement.style.setProperty("--num-card", cards.length);
//   // return (
//   //   <div className="hand">
//   //     {cards = cards.map((s, index) => (<Card theString={s} index={index}/>))}
//   //   </div>
//   // );
// }
// export default Hand;