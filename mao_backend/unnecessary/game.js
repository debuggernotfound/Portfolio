import Deck from "../src/modules/deck.js";
import CardRule from "../src/modules/card_rules.js";
import Card from "../src/modules/card.js";


class Game {
    constructor(){
        //create id
        this.ID = Math.floor(Math.random()*1000000)
        //create deck
        this.deck = new Deck(1, true);
        //assign machine and person cards
        this.machineCards = new Map();
        let tempMachineArr = this.deck.draw(21);
        for(let i = 0; i < 21; i++){
            this.machineCards.set(tempMachineArr[i], " ");
        }
        this.playerCards = new Map();
        let tempPlayerArr = this.deck.draw(7);
        for(let i = 0; i < 7; i++){
            this.playerCards.set(tempPlayerArr[i], " ");
        }       
        //get top card
        this.topCard = this.deck.draw(1).at(0);
        //create random card rule set
        const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
        const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
        const actions = ["knock", "saying hello", "who's the monkey", "there's the monkey", "hola senora"];
        let lengthOfCRA = Math.floor(Math.random()*5) + 1;
        this.cardRuleArray = new Array();
        for(let i = 0; i < lengthOfCRA; i++){
            let suitOrValue = Math.floor(Math.random()*2);
            let tempRule;
            let actionsIndex = Math.floor(Math.random()*actions.length);
            if(suitOrValue == 0){
                let suitsEmpty = true;
                for(let j = 0; j < suits.length; j++){
                    if(!(suits[j]===" ")){
                        suitsEmpty = false;
                    }
                }
                if(!suitsEmpty){
                    let sIndex = Math.floor(Math.random()*4);
                    while(suits[sIndex]===" "){
                        sIndex = Math.floor(Math.random()*4);
                    }
                    tempRule = new CardRule(true, suits[sIndex], actions[actionsIndex]);
                    suits[sIndex] = " ";
                }     
            }
            else{
                let valuesEmpty = true;
                for(let j = 0; j < values.length; j++){
                    if(!(values[j]===" ")){
                        valuesEmpty = false;
                    }
                }
                if(!valuesEmpty){
                    let vIndex = Math.floor(Math.random()*13);
                    while(values[vIndex]===" "){
                        vIndex = Math.floor(Math.random()*13);
                    }
                    tempRule = new CardRule(false, values[vIndex], actions[actionsIndex]);
                    values[vIndex] = " ";
                }                 
            }
            this.cardRuleArray.push(tempRule);
        }
        //assign who's turn it is
        this.playersTurn = true;
    }
    getTopCard(){
        return this.topCard;
    }  
    getPlayerCards(){
        return this.playerCards;
    }
    getMachineNumberOfCards(){
        return this.machineCards.size;
    }
    getWhosPlaying(){
        return this.playersTurn;
    }

    processCardPlayed(cardPlayed, isPlayer){
        if(!(this.topCard.getSuit()===cardPlayed.getSuit()) && this.topCard.getValue()===cardPlayed.getValue()){
            return false;
        }
        this.topCard = cardPlayed;
        if(!(this.topCard.getValue()===("Ace"))){
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
    determinePenalty(cardPlayed, actionTaken){
        let cardPenaltyReasons = new Array();
        for(let i = 0; i < actionTaken.length; i++){
            actionTaken[i] = actionTaken[i].toLowerCase();
        }
        //card put down was incorrect
        if(!this.playersTurn){
            cardPenaltyReasons.push("Played out of order. It is the machine's turn.");
            this.playerCards = this.playerCards.set(this.drawCard(true), " ");
            return cardPenaltyReasons;
        }
        if(!this.processCardPlayed(cardPlayed, true)){
            cardPenaltyReasons.push("Must play card that is either the same suit or same value as the top card.");
            this.playerCards = this.playerCards.set(this.drawCard(true), " ");
            return cardPenaltyReasons;
        }
        //random card rules 
        let numberToDraw = 0; 
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let tempCardRule = this.cardRuleArray[i];
            if(!tempCardRule.cardRuleSatisfied(cardPlayed, actionTaken)){
                cardPenaltyReasons.push("Failure to say \"" + tempCardRule.getActionNeeded() + "\"");
                numberToDraw++;
            }
        }
        //set card rules
        //* spades
        if(cardPlayed.getSuit()===("Spades")){
            let action = cardPlayed.getValue().toLowerCase() + " of spades";
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
        let sevenRule = new CardRule(false, "Seven", "have a nice day");
        if(cardPlayed.getValue()===("Seven")){
            this.drawCard(false);
        }
        if(!sevenRule.cardRuleSatisfied(cardPlayed, actionTaken)){
            cardPenaltyReasons.push("Failure to say \"" + sevenRule.getActionNeeded() + "\"");
            numberToDraw++;
        }
        //* last card rule
        if(this.playerCards.length == 1){
            let action = "mao";
            let index = actionTaken.indexOf(action);
            if(index == -1){
                cardPenaltyReasons.push("Failure to say \"" + action + "\"");
                numberToDraw++;
            }
            else{
                actionTaken[index] = "action_processed";
            }
        }
        //* all hail rule
        if(cardPlayed.getValue()===("King")){
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
            this.drawCard(true);
        }
        return cardPenaltyReasons;
    }

    drawCard(guaranteeAddToPlayer){
        let tempDrawCard = this.deck.draw(1).at(0);
        while(this.playerCards.hasOwnProperty(tempDrawCard) || this.machineCards.hasOwnProperty(tempDrawCard)){
            tempDrawCard = this.deck.draw(1).at(0);
        }
        if(this.playersTurn || guaranteeAddToPlayer){
            this.playerCards.set(tempDrawCard, " ");
        }
        else{
            this.machineCards.set(tempDrawCard, " ");
        }
    }
    determineMachineMove(){
        let machineSays = new Array();
        let tempCard;
        let tempArr = this.machineCards.keys();
        for(let i = 0; i < this.machineCards.size; i++){
            tempCard = tempArr.next().value;
            if(tempCard.getSuit() == this.topCard.getSuit() || tempCard.getValue() == this.topCard.getValue()){
                this.processCardPlayed(tempCard, false);
                break;
            }
        }
        if(tempCard == undefined){
            this.drawCard(false);
            return machineSays;
        }
        let tempActionTakenArr = new Array();
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let tempCardRule = this.cardRuleArray[i];
            if(!tempCardRule.cardRuleSatisfied(tempCard, tempActionTakenArr)){
                machineSays.push(tempCardRule.getActionNeeded());
            }
        }
        if(tempCard.getSuit()===("Spades")){
            machineSays.push(tempCard.getValue.toLowerCase + " of spades");
        }
        if(tempCard.getValue()===("Seven")){
            machineSays.push("have a nice day");
        }
        if(this.machineCards.length == 1){
            machineSays.push("mao");
        }
        if(tempCard.getValue()===("King")){
            machineSays.push("All hail king of " + tempCard.getSuit());
        }
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