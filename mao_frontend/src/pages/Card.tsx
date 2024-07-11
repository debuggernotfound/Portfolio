import React from 'react';
import './Card.scss';
import {motion, LayoutGroup, useDragControls, animate, Variants} from 'framer-motion';

function Card(index, imagePathway, isFlippedOver, givenStyle, degreeRotation){
  // imagePathway: String;
  // isFlippedOver: boolean;
  //   constructor(){
  //   this.imagePathway = imagePathway;
  //   this.isFlippedOver = isFlippedOver;
  // }
  // renderCard(){
    let translateUpDown = isFlippedOver ? 1:-1
    let tOrigin = isFlippedOver ? `center ${-30}%` : `center ${150}%`;
    let whileHoverConstant = isFlippedOver ? 0 : 20*translateUpDown
    const [active, setActive] = React.useState(false);
    // const [hover, setHover] = React.useState(false);
    const container: Variants = {
      active: {rotate:0, translateY:-300},
      disabled: {rotate: degreeRotation, transformOrigin: tOrigin},
      hover: {rotate: degreeRotation, transformOrigin: tOrigin, translateY:10}
    };
    const imageName = isFlippedOver ? `flipped_card.jpg`: `${imagePathway}.png`;
    const imagePath = `./cards/${imageName}`;
    return(
      <motion.div 
      //animate states = 0
      //put blue highlight on hover
      animate={active && !isFlippedOver ? "active":"disabled"}
      variants={container}
      whileHover={active || isFlippedOver ? {}:{rotate: degreeRotation, transformOrigin: tOrigin, translateY:-10}}
      onClick={() => [setActive(true)]}
      style={givenStyle}
      className="card" 
      initial={{rotate: degreeRotation, transformOrigin:tOrigin}} 
      // onHoverStart ={() => setActive(2)}
      // onHoverEnd={() => setActive(index)}
      >
        <img
         src = {imagePath} alt={""} className="card_image"/>
      </motion.div>
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
export default Card;
// import React from 'react';
// import './Card.scss';
// import { motion} from 'framer-motion';

// class Card{
//     constructor(imagePathway, isFlippedOver){
//       this.imagePathway = imagePathway;
//       this.isFlippedOver = isFlippedOver;
//       this.isChosen = false;
//     }
//     getImagePathway(){
//       return this.imagePathway;
//     }
//     renderCard(givenStyle, degreeRotation){
//       const imageName = this.isFlippedOver ? `flipped_card.jpg`: `${this.imagePathway}.png`;
//       const imagePath = `./cards/${imageName}`;
//       let translateUpDown = this.isFlippedOver ? 1:-1
//       let tOrigin = this.isFlippedOver ? `center ${-30}%` : `center ${150}%`;
//       let whileHoverConstant = this.isFlippedOver ? 0 : 50*translateUpDown
//       return(
//         <motion.div 
//         drag
//         dragMomentum={false}
//         className="card" 
//         style={givenStyle}
//         initial={{rotate:degreeRotation, transformOrigin:tOrigin}} 
//         whileHover={{translateY:whileHoverConstant}}
//         >
//           <motion.img
//           drag
//            src = {imagePath} alt={""} className="card_image"/>
//         </motion.div>
//       )
//     }
//     rC(givenStyle, degreeRotation){
//     const imageName = this.isFlippedOver ? `flipped_card.jpg`: `${this.imagePathway}.png`;
//     const imagePath = `./cards/${imageName}`;
//     console.log("hello");
//     let tOrigin = this.isFlippedOver ? `center ${-30}%` : `center ${150}%`;
//     let hoverDirection = degreeRotation > 0 ? 1:-1;
//     let whileHoverConstant = this.isFlippedOver ? 0 : 50;
//     // const x = useMotionValue(0); 
//     // const y = useMotionValue(0);
//     // let pX = 0; 
//     // let pY = 0;
//     // const handleDragEnd = (event, info) => {
//     //   // console.log(info.point.y);
//     //   // console.log(pY);
//     //   // if(info.point.y > pY + 50){
//     //   //   pY=50; 
//     //   // }
//     // }
//     // const handleDragStart = (event, info) => {
//     //   pY=info.point.y;
//     //   pX = info.point.x;
//     //   console.log(pX, pY);
//     // }
//     // let changeStyle;
//     return(
//       <motion.div 
//       className="card" 
//       style={givenStyle}
//       initial={{rotate:degreeRotation, transformOrigin:tOrigin}} 
//       whileHover={{translateX: hoverDirection*10, translateY:-whileHoverConstant}}
//       >
//         <img src = {imagePath} alt={""} className="card_image"/>
//       </motion.div>
//     );
//   }
//         // drag
//       // dragMomentum={false}
//       // whileDrag={{rotate:0}}
//       // onDragStart=
//       //   handleDragStart
//       // }
//       // onDragEnd={handleDragEnd}
//       //onClick={() => givenStyle={rotate:0, x:50, y:50}}
//   // drag
//   // className="card" 
//   // style={givenStyle}
//   // initial={{rotate:degreeRotation, transformOrigin:tOrigin}} 
//   // whileHover={{translateY:whileHoverConstant}}
//   // >
//   //   <motion.img drag src = {imagePath} alt={""} className="card_image"/>
//   // </motion.div>
//   //        <img src = {imagePath} alt={""} className="card_image"/>

//   //translateX:50*Math.cos(degreeRotation*Math.PI/180),translateY:50*Math.sin(degreeRotation*Math.PI/180)
//     // const imageName = `${theString}.png`;
//     // const imagePath = `./cards/${imageName}`;
//     // return (
//     //   <div className="card">
//     //     <img src = {imagePath} alt={theString} className="card_image"/>
//     //   </div>
//     // );
//   // }
// }
// export default Card;