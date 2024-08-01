import * as gameService from "../services/gameService.js";
//form new game when the home "play" button is pressed
export const createNewGame = (req, res) => {
    const newGameCreated = gameService.createNewGame();
    res.send({gameID: newGameCreated});
};
//return initial machine hand number to client 
export const getInitialMachineHandNumber = (req, res) => {
    const initialMachineHandNumber = gameService.getInitialMachineHandNumber();
    res.send({initialNumber:initialMachineHandNumber});
};
//return initial player hand to client
export const getInitialPlayerHand = (req, res) => {
    const initialPlayerHand = gameService.getInitialPlayerHand();
    res.send({status: "OK", playerHand:initialPlayerHand});
};
//update player hand in server when the player plays a card or draws a card
export const updatePlayerHand = (req, res) => {
    // console.log(req);
    let prevIndexForActionArray = req.body.lastIndex;
    let cardPlayed = req.body.playedCard;
    let messagesSent = req.body.messagesSent;
    const updatedPlayerHand = gameService.updatePlayerHand(cardPlayed, messagesSent, prevIndexForActionArray);
    console.log(updatedPlayerHand);
    res.json({status: 202, updatedHand: [updatedPlayerHand]});

};
//get what card the machine will play and if it draws, add card to machine number. if not, then delete a card from machine number
export const getMachineMove = (req, res) => {
    const machineMove = gameService.getMachineMove();
    res.send({machineMove: [machineMove]});
};
//fired when the card is drawn from deck?
export const drawCardFromDeck = (req, res) => {
    const newDrawnCard = gameService.drawCardFromDeck();
    res.send("Draw card from deck");
};
export const getTopCard = (req, res) => {
    const topCard = gameService.getTopCard();
    res.send({status: 202, imagePathway: topCard});
};
function gameController(){
    return true;
}
export default gameController;

