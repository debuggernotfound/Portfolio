import Game from "../modules/game.js";
import Card from "../modules/card.js";

let game = new Game();

export const createNewGame = () => {
    game = new Game();
    return game.ID;
};
export const getInitialMachineHandNumber = () => {
    return game.getMachineNumberOfCards();
};
export const getInitialPlayerHand = () => {
    return game.getPlayerCards();
};
export const updatePlayerHand = (cardPlayed, messagesSent) => {
    let tempCard = cardPlayed;
    if(cardPlayed!=="draw"){
        let value = cardPlayed.substring(0, cardPlayed.indexOf("_"));
        cardPlayed = cardPlayed.substring(cardPlayed.indexOf("_") + 1, cardPlayed.length);
        let suit = cardPlayed.substring(cardPlayed.indexOf("_") + 1, cardPlayed.length);
        tempCard = new Card(suit, value);
    }
    let cardPenaltyReasonsAndCardsDrawn = game.determinePenalty(tempCard, messagesSent);
    return cardPenaltyReasonsAndCardsDrawn;
};
export const getMachineMove = () => {
    return game.determineMachineMove();
};
export const getTopCard = () => {
    return game.getTopCard();
};
export const drawCardFromDeck = (num) => {
    return;
};

function gameService(){
    return;
}
export default gameService; 