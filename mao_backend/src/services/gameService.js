import Game from "../modules/game.js";
import Card from "../modules/card.js";

let game = new Game();

export const createNewGame = () => {
    game = new Game();
    console.log("new game created");
    return game.ID;
};
export const getInitialMachineHandNumber = () => {
    return game.getMachineNumberOfCards();
};
export const getInitialPlayerHand = () => {
    return game.getPlayerCards();
};
export const updatePlayerHand = (cardPlayed, messagesSent, prevIndexForActionArray) => {
    let tempCard = cardPlayed;
    console.log(cardPlayed);
    if(cardPlayed!=="draw"){
        let value = cardPlayed.substring(0, cardPlayed.indexOf("_"));
        cardPlayed = cardPlayed.substring(cardPlayed.indexOf("_") + 1, cardPlayed.length);
        let suit = cardPlayed.substring(cardPlayed.indexOf("_") + 1, cardPlayed.length);
        tempCard = new Card(suit, value);
    }
    let playerMessagesSent = new Array();
    console.log("prev index: " + prevIndexForActionArray);
    console.log("messagesSent length: " + messagesSent.length);
    let messagesSentLength = messagesSent.length;
    for(let i = prevIndexForActionArray; i < messagesSentLength; i++){
        let tempMessage = messagesSent.pop();
        console.log(tempMessage);
        if(tempMessage.person==="You"){
            playerMessagesSent.push(tempMessage.message);
        }
    }
    console.log(playerMessagesSent);
    console.log(tempCard);
    let cardPenaltyReasonsAndCardsDrawn = game.determinePenalty(tempCard, playerMessagesSent);
    return cardPenaltyReasonsAndCardsDrawn;
};
export const getMachineMove = () => {
    return game.determineMachineMove();
};
export const getTopCard = () => {
    return game.getTopCard().getImagePathway();
};
export const drawCardFromDeck = (num) => {
    return;
};

function gameService(){
    return;
}
export default gameService; 