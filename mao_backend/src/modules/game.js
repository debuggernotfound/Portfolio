import Deck from "./deck.js";
import CardRule from "./card_rules.js";
import { rules } from "./rules.js";
class Game {
    constructor(){
        //create id
        this.ID = Math.floor(Math.random()*1000000);
        //create deck
        this.deck = new Deck(1, true);
        //assign machine and person cards
        this.machineCards = new Map();
        let machineCardsNumber = 13;
        let tempMachineArr = this.deck.draw(machineCardsNumber);
        for(let i = 0; i < machineCardsNumber; i++){
            this.machineCards.set(tempMachineArr[i], " ");
        }
        console.log(this.machineCards);
        this.playerCards = new Map();
        let playerCardsNumber = 7;
        let tempPlayerArr = this.deck.draw(playerCardsNumber);
        for(let i = 0; i < playerCardsNumber; i++){
            this.playerCards.set(tempPlayerArr[i], " ");
        }  
        // console.log(tempMachineArr);     
        //get top card
        this.topCard = this.deck.draw(1).at(0);
        //initialize past card array
        this.pastCards = new Array();
        //create random card rule set
        this.totalCardRules= rules;
        let lengthOfCRA = Math.floor(Math.random()*(5)) + 2;
        this.cardRuleArray = new Set();
        for(let i = 0; i < lengthOfCRA; i++){
            let tempIndexOfRule = Math.floor(Math.random()*this.totalCardRules.length);
            let currRuleSetLength = this.cardRuleArray.size;
            this.cardRuleArray.add(this.totalCardRules.at(tempIndexOfRule));
            while(this.cardRuleArray.size == currRuleSetLength){
                tempIndexOfRule = Math.floor(Math.random()*this.totalCardRules.length);
                this.cardRuleArray.add(this.totalCardRules.at(tempIndexOfRule));
            }
        }
        this.cardRuleArray = Array.from(this.cardRuleArray);
        //assign who's turn it is
        this.playersTurn = true;
    }
    getTopCard(){
        return this.topCard;
    }  
    getPlayerCards(){
        let toReturn = new Array();
        let keys = this.playerCards.keys();
        while(true){
            let toPush = keys.next();
            if(toPush.done){
                break;
            }
            toReturn.push(toPush.value.getImagePathway());
        }
        return toReturn;
    }
    getMachineNumberOfCards(){
        return this.machineCards.size;
    }
    getWhosPlaying(){
        return this.playersTurn;
    }
    processCardPlayed(cardPlayed, isPlayer){
        this.topCard = cardPlayed;
        this.pastCards.push(cardPlayed);
        if(!(this.topCard.getValue()===("ace"))){
            this.playersTurn = !this.playersTurn;
        }
        if(isPlayer){
            this.playerCards.delete(cardPlayed);
            return true;
        }
        else{
            this.machineCards.delete(cardPlayed);
            return true;
        }
        
    }
    //takes a card object and an array of strings and returns an array that pops out the number of cards that the player will draw, which cards they are, and the reasons why
    determinePenalty(cardPlayed, actionTaken){
        console.log(actionTaken);
        let cardPenaltyReasons = new Array();
        let numberToDraw = 0; 
        actionTaken = actionTaken.map((action) => (action.toLowerCase()));
        //card put down was incorrect
        if(!this.playersTurn){
            cardPenaltyReasons.push("Out of order. Wait for the machine to play.");
            cardPenaltyReasons.push(this.drawCard(true));
            cardPenaltyReasons.push(1);
            cardPenaltyReasons.push(this.playersTurn);
            return cardPenaltyReasons;
        }
        if(cardPlayed==="draw"){
            for(let i = 0; i < actionTaken.length; i++){
                if(!(actionTaken[i]===("action_processed"))){
                    cardPenaltyReasons.push("Talking");
                    numberToDraw++;
                }
            }
            for(let i = 0; i < numberToDraw + 1; i++){
                cardPenaltyReasons.push(this.drawCard(true));
            }
            cardPenaltyReasons.push(numberToDraw + 1);
            this.playersTurn = !this.playersTurn;
            cardPenaltyReasons.push(this.playersTurn);
            // console.log("Card penalty reasons: " + cardPenaltyReasons);
            return cardPenaltyReasons;
        }
        if(!this.processCardPlayed(cardPlayed, true)){
            cardPenaltyReasons.push("Must play card that is either the same suit or same value as the top card.");
            this.playerCards = this.playerCards.set(this.drawCard(true), " ");
            return cardPenaltyReasons;
        }
        //* last card rule
        if(this.playerCards.size == 2){
            console.log("in the mao code bracket rn");
            let action = "mao";
            let index = actionTaken.indexOf("mao");
            if(index == -1){
                cardPenaltyReasons.push("Failure to recognize the chairman");
                numberToDraw++;
            }
            else{
                actionTaken[index] = "action_processed";
            }
        }
        //random card rules 
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let currCardRule = this.cardRuleArray.at(i);
            let currType = currCardRule.type;
            if(currType === "suitOrValue"){
                if(currCardRule.isSuit && (currCardRule.validKeys.indexOf(cardPlayed.getSuit()) != -1)){
                    let actionNeeded;
                    if(currCardRule.suitOrValueNeeded){
                        let cardValue = cardPlayed.getValue();
                        actionNeeded = currCardRule.actionNeeded[cardValue];
                    }
                    else{
                        actionNeeded = currCardRule.actionNeeded;
                    }
                    let indexOfAction = actionTaken.indexOf(actionNeeded);
                    if(indexOfAction != -1){
                        actionTaken[indexOfAction] = "action_processed";
                    }
                    else{
                        cardPenaltyReasons.push(currCardRule.penalty);
                        numberToDraw++;
                    }
                }
                else if(!currCardRule.isSuit && (currCardRule.validKeys.indexOf(cardPlayed.getValue()) != -1)){
                    let actionNeeded;
                    if(currCardRule.suitOrValueNeeded){
                        let cardValue = cardPlayed.getSuit();
                        actionNeeded = currCardRule.actionNeeded[cardValue];
                    }
                    else{
                        actionNeeded = currCardRule.actionNeeded;
                    }
                    let indexOfAction = actionTaken.indexOf(actionNeeded);
                    if(indexOfAction != -1){
                        actionTaken[indexOfAction] = "action_processed";
                    }
                    else{
                        cardPenaltyReasons.push(currCardRule.penalty);
                        numberToDraw++;
                    }
                }
            }
            else if(currType === "value sequence"){
                let currPastCardSequence = new Array();
                let totalNumPastCards = this.pastCards.length;
                if(totalNumPastCards > currCardRule.numberOfValuesToCheck){
                    let doesValueSequenceMatch;
                    for(let i = 0; i < currCardRule.numberOfValuesToCheck; i++){
                        let currentCardToBePushed = this.pastCards.at(totalNumPastCards - 1 - i).getValue();
                        // console.log("curr card to be pushed" + currentCardToBePushed);
                        currPastCardSequence.push(currentCardToBePushed);
                    }
                    for(let i = 0; i < currCardRule.validValues.length; i++){
                        let checkingArr = currCardRule.validValues.at(i);
                        let currMatches = true;
                        for(let j = 0; j < checkingArr.length; j++){
                            if(currPastCardSequence.at(j) !== checkingArr.at(j)){
                                currMatches = false;
                                break;
                            }
                        }
                        if(currMatches){
                            doesValueSequenceMatch = true;
                        }
                    }
                    if(doesValueSequenceMatch){
                        let indexOfAction = actionTaken.indexOf(currCardRule.actionNeeded);
                        if(indexOfAction != -1){
                            actionTaken[indexOfAction] = "action_processed";
                        }
                        else{
                            cardPenaltyReasons.push(currCardRule.penalty);
                            numberToDraw++;
                        }
                    }
                }
            }
            else if(currType === "suit sequence"){
                let currPastCardSequence = new Array();
                let totalNumPastCards = this.pastCards.length;
                let doesSuitSequenceMatch;
                if(totalNumPastCards > currCardRule.numberOfValuesToCheck){
                    for(let i = 0; i < currCardRule.numberOfValuesToCheck; i++){
                        let currentCardToBePushed = this.pastCards.at(totalNumPastCards - 1 - i).getSuit();
                        currPastCardSequence.push(currentCardToBePushed);
                    }
                    for(let i = 0; i < currCardRule.validValues.length; i++){
                        let checkingArr = currCardRule.validValues.at(i);
                        let currMatches = true;
                        for(let j = 0; j < checkingArr.length; j++){
                            if(currPastCardSequence.at(j) !== checkingArr.at(j)){
                                currMatches = false;
                                break;
                            }
                        }
                        if(currMatches){
                            doesSuitSequenceMatch = true;
                        }
                    }
                    if(doesSuitSequenceMatch){
                        let indexOfAction = actionTaken.indexOf(currCardRule.actionNeeded);
                        if(indexOfAction != -1){
                            actionTaken[indexOfAction] = "action_processed";
                        }
                        else{
                            cardPenaltyReasons.push(currCardRule.penalty);
                            numberToDraw++;
                        }
                    }
                }
            }
            // console.log(tempCardRule.getGivenSuitOrValue() + ": " + tempCardRule.getActionNeeded());
            // if(!tempCardRule.cardRuleSatisfied(cardPlayed, actionTaken)){
            //     cardPenaltyReasons.push("Failure to say \"" + tempCardRule.getActionNeeded() + "\"");
            //     numberToDraw++;
            // }
        }
        //set card rules
        //* spades
        if(cardPlayed.getSuit()===("spades")){
            // console.log("i am here executing spades code");
            let action = cardPlayed.getValue().toLowerCase() + " of spades";
            // console.log("action taken array: " + actionTaken);
            let index = actionTaken.indexOf(action);
            if(index == -1){
                cardPenaltyReasons.push("Failure to say \"" + action + "\"");
                numberToDraw++;
            }
            else{
                actionTaken[index] = "action_processed";
            }
        }
        //* sevens
        let playerPlayedSeven = false;
        if(cardPlayed.getValue()===("seven")){
            console.log(actionTaken);
            if(actionTaken.indexOf("have a nice day") == -1){
                cardPenaltyReasons.push("Failure to be polite");
                numberToDraw++;
            }
            playerPlayedSeven = true;
            this.drawCard(false);
        }

        //* all hail rule
        if(cardPlayed.getValue()===("king")){
            let action = "all hail king of " + cardPlayed.getSuit().toLowerCase();
            let index = actionTaken.indexOf(action);
            if(index == -1){
                cardPenaltyReasons.push("Failure to say \"" + action + "\"");
                numberToDraw++;
            }
            else{
                actionTaken[index] = "action_processed";
            }
        }
        //al other things entered are considered talking
        for(let i = 0; i < actionTaken.length; i++){
            if(!(actionTaken[i]===("action_processed"))){
                cardPenaltyReasons.push("Talking");
                numberToDraw++;
            }
        }
        for(let i = 0; i < numberToDraw; i++){
            cardPenaltyReasons.push(this.drawCard(true));
        }
        cardPenaltyReasons.push(numberToDraw);
        if(playerPlayedSeven){
            cardPenaltyReasons.unshift(true);
        }
        cardPenaltyReasons.push(this.playersTurn);
        return cardPenaltyReasons;
    }
    drawCard(isAddedToPlayer){
        let tempDrawCard = this.deck.draw(1).at(0);
        while(this.playerCards.has(tempDrawCard) || this.machineCards.has(tempDrawCard) || this.topCard.getImagePathway()===tempDrawCard.getImagePathway()){
            tempDrawCard = this.deck.draw(1).at(0);
        }
        if(isAddedToPlayer){
            this.playerCards.set(tempDrawCard, " ");
        }
        else{
            this.machineCards.set(tempDrawCard, " ");
        }
        return tempDrawCard.getImagePathway();
    }
    determineMachineMove(){
        // console.log(this.machineCards);
        let machineSays = new Array();
        let tempCard;
        let tempArr = this.machineCards.keys();
        let tempIndex;
        console.log("top card: " + this.topCard);
        for(let i = 0; i < this.machineCards.size; i++){
            tempCard = tempArr.next().value;
            // console.log(tempCard);
            if(tempCard.getSuit() === this.topCard.getSuit() || tempCard.getValue() === this.topCard.getValue()){
                this.processCardPlayed(tempCard, false);
                // console.log(i);
                tempIndex = i;
                break;
            }
            tempCard = undefined;
        }
        if(tempCard == undefined){
            // console.log("undefined");
            machineSays.push(this.drawCard(false));
            this.playersTurn=true;
            machineSays.push(false);
            machineSays.push(this.playersTurn);
            return machineSays;
        }
        // let tempActionTakenArr = new Array();
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let currCardRule = this.cardRuleArray.at(i);
            let currType = currCardRule.type;
            if(currType === "suitOrValue"){
                if(currCardRule.isSuit && (currCardRule.validKeys.indexOf(tempCard.getSuit()) != -1)){
                    let actionNeeded;
                    if(currCardRule.suitOrValueNeeded){
                        let cardValue = tempCard.getValue();
                        actionNeeded = currCardRule.actionNeeded[cardValue];
                    }
                    else{
                        actionNeeded = currCardRule.actionNeeded;
                    }
                    machineSays.push(actionNeeded);
                }
                else if(!currCardRule.isSuit && (currCardRule.validKeys.indexOf(tempCard.getValue()) != -1)){
                    let actionNeeded;
                    if(currCardRule.suitOrValueNeeded){
                        let cardValue = tempCard.getSuit();
                        actionNeeded = currCardRule.actionNeeded[cardValue];
                    }
                    else{
                        actionNeeded = currCardRule.actionNeeded;
                    }
                    machineSays.push(actionNeeded);
                }
            }
            else if(currType === "value sequence"){
                let currPastCardSequence = new Array();
                let totalNumPastCards = this.pastCards.length;
                let doesValueSequenceMatch;
                if(totalNumPastCards > currCardRule.numberOfValuesToCheck){
                    for(let i = 0; i < currCardRule.numberOfValuesToCheck; i++){
                        currPastCardSequence.push(this.pastCards.at(totalNumPastCards - 1 - i).getValue());
                    }
                    for(let i = 0; i < currCardRule.validValues.length; i++){
                        let checkingArr = currCardRule.validValues.at(i);
                        let currMatches = true;
                        for(let j = 0; j < checkingArr.length; j++){
                            if(currPastCardSequence.at(j) !== checkingArr.at(j)){
                                currMatches = false;
                                break;
                            }
                        }
                        if(currMatches){
                            doesValueSequenceMatch = true;
                        }
                    }
                    if(doesValueSequenceMatch){
                        machineSays.push(currCardRule.actionNeeded)
                    }
                }
            }
            else if(currType === "suit sequence"){
                let currPastCardSequence = new Array();
                let totalNumPastCards = this.pastCards.length;
                let doesSuitSequenceMatch;
                if(totalNumPastCards > currCardRule.numberOfValuesToCheck){
                    for(let i = 0; i < currCardRule.numberOfValuesToCheck; i++){
                        currPastCardSequence.push(this.pastCards.at(totalNumPastCards - 1 - i).getSuit());
                    }
                    for(let i = 0; i < currCardRule.validValues.length; i++){
                        let checkingArr = currCardRule.validValues.at(i);
                        let currMatches = true;
                        for(let j = 0; j < checkingArr.length; j++){
                            if(currPastCardSequence.at(j) !== checkingArr.at(j)){
                                currMatches = false;
                                break;
                            }
                        }
                        if(currMatches){
                            doesSuitSequenceMatch = true;
                        }
                    }
                    if(doesSuitSequenceMatch){
                        machineSays.push(currCardRule.actionNeeded);
                    }
                }
            }
            // console.log(tempCardRule.getGivenSuitOrValue() + ": " + tempCardRule.getActionNeeded());
            // if(!tempCardRule.cardRuleSatisfied(cardPlayed, actionTaken)){
            //     cardPenaltyReasons.push("Failure to say \"" + tempCardRule.getActionNeeded() + "\"");
            //     numberToDraw++;
            // }
        }
        // console.log(tempCard.getSuit() + " " + tempCard.getValue());
        if(tempCard.getSuit()===("spades")){
            machineSays.push(tempCard.getValue().toLowerCase() + " of spades");
        }
        if(tempCard.getValue()===("seven")){
            machineSays.push("have a nice day");
        }
        if(this.machineCards.size == 1){
            machineSays.push("mao");
        }
        if(tempCard.getValue()===("king")){
            machineSays.push("All hail king of " + tempCard.getSuit());
        }
        console.log(machineSays);
        machineSays.push(tempCard.getImagePathway());
        machineSays.push(tempIndex);
        machineSays.push(true);
        machineSays.push(this.playersTurn);
        return machineSays;
    }

    isGameDone(){
        if(this.machineCards.length == 0 || this.playerCards.length == 0){
            return true;
        }
        return false;
    }
}
export default Game;