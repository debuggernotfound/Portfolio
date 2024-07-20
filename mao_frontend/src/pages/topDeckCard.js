import React from 'react';
import './Deck.css';
import './Card.scss';
import {motion} from 'framer-motion';
import { playerHandState } from './GameStates';
import { useAtom } from 'jotai';
function TopDeckCard(){
    const imageName = `flipped_card.jpg`;
    const imagePath = `./cards/${imageName}`;
    const [playerHand, setPlayerHand] = useAtom(playerHandState);
    const handleClick = () => {
        let changedArr = [...playerHand];
        changedArr.push("ace_of_spades");
        setPlayerHand(changedArr);
    }
    return(
        <motion.div 
        onClick={handleClick}
        className = "deck">
            <img src = {imagePath} alt={""} className="card_image"/>
        </motion.div>
    )
}
export default TopDeckCard;