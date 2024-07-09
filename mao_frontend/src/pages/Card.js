import React from 'react';
import './Card.scss';
import {motion, LayoutGroup, useDragControls} from 'framer-motion';

class Card{
  constructor(imagePathway, isFlippedOver){
    this.imagePathway = imagePathway;
    this.isFlippedOver = isFlippedOver;
  }
  renderCard(givenStyle, degreeRotation){
    const imageName = this.isFlippedOver ? `flipped_card.jpg`: `${this.imagePathway}.png`;
    const imagePath = `./cards/${imageName}`;
    let translateUpDown = this.isFlippedOver ? 1:-1
    let tOrigin = this.isFlippedOver ? `center ${-30}%` : `center ${150}%`;
    let whileHoverConstant = this.isFlippedOver ? 0 : 50*translateUpDown
    return(
      <LayoutGroup>
      <motion.div 
      drag
      dragMomentum={false}
      className="card" 
      style={givenStyle}
      initial={{rotate:degreeRotation, transformOrigin:tOrigin}} 
      whileHover={{translateY:whileHoverConstant}}
      >
        <motion.img
        drag
         src = {imagePath} alt={""} className="card_image"/>
      </motion.div>
      </LayoutGroup>
    )
  }
  // <motion.div 
  // drag
  // className="card" 
  // style={givenStyle}
  // initial={{rotate:degreeRotation, transformOrigin:tOrigin}} 
  // whileHover={{translateY:whileHoverConstant}}
  // >
  //   <motion.img drag src = {imagePath} alt={""} className="card_image"/>
  // </motion.div>
  //        <img src = {imagePath} alt={""} className="card_image"/>

  //translateX:50*Math.cos(degreeRotation*Math.PI/180),translateY:50*Math.sin(degreeRotation*Math.PI/180)
    // const imageName = `${theString}.png`;
    // const imagePath = `./cards/${imageName}`;
    // return (
    //   <div className="card">
    //     <img src = {imagePath} alt={theString} className="card_image"/>
    //   </div>
    // );
  }
export default Card;