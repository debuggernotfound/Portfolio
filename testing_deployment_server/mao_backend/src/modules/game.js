import Deck from "./deck.js";
import CardRule from "./card_rules.js";


class Game {
    constructor(){
        //create id
        this.ID = Math.floor(Math.random()*1000000)
        //create deck
        this.deck = new Deck(1, true);
        //assign machine and person cards
        this.machineCards = new Map();
        let machineCardsNumber = 5;
        let tempMachineArr = this.deck.draw(machineCardsNumber);
        for(let i = 0; i < machineCardsNumber; i++){
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
        const suits = ["clubs", "spades", "diamonds", "hearts"];
        const values = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"]
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
        //might deal with the people playing the wrong suit in react itself
        // if(!(this.topCard.getSuit()===cardPlayed.getSuit()) && !(this.topCard.getValue()===cardPlayed.getValue())){
        //     return false;
        // }
        this.topCard = cardPlayed;
        this.playersTurn = !this.playersTurn;
        // if(!(this.topCard.getValue()===("Ace"))){
        //     this.playersTurn = !this.playersTurn;
        // }
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
        let cardPenaltyReasons = new Array();
        let numberToDraw = 0; 
        actionTaken = actionTaken.map((action) => (action.toLowerCase()));
        //card put down was incorrect
        if(!this.playersTurn){
            cardPenaltyReasons.push("Played out of order. It is the machine's turn.");
            cardPenaltyReasons.push(this.drawCard(true));
            cardPenaltyReasons.push(1);
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
            console.log("Card penalty reasons: " + cardPenaltyReasons);
            return cardPenaltyReasons;
        }
        if(!this.processCardPlayed(cardPlayed, true)){
            cardPenaltyReasons.push("Must play card that is either the same suit or same value as the top card.");
            this.playerCards = this.playerCards.set(this.drawCard(true), " ");
            return cardPenaltyReasons;
        }
        //random card rules 
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let tempCardRule = this.cardRuleArray.at(i);
            console.log(tempCardRule.getGivenSuitOrValue() + ": " + tempCardRule.getActionNeeded());
            if(!tempCardRule.cardRuleSatisfied(cardPlayed, actionTaken)){
                cardPenaltyReasons.push("Failure to say \"" + tempCardRule.getActionNeeded() + "\"");
                numberToDraw++;
            }
        }
        //set card rules
        //* spades
        if(cardPlayed.getSuit()===("spades")){
            console.log("i am here executing spades code");
            let action = cardPlayed.getValue().toLowerCase() + " of spades";
            console.log("action taken array: " + actionTaken);
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
        let sevenRule = new CardRule(false, "seven", "have a nice day");
        if(cardPlayed.getValue()===("seven")){
            //TODO: ADD CODE TO RETURN THE MACHINE HAND NUMBER TOO
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
        return cardPenaltyReasons;
    }

    drawCard(guaranteeAddToPlayer){
        let tempDrawCard = this.deck.draw(1).at(0);
        while(this.playerCards.has(tempDrawCard) || this.machineCards.has(tempDrawCard)){
            tempDrawCard = this.deck.draw(1).at(0);
        }
        if(this.playersTurn || guaranteeAddToPlayer){
            this.playerCards.set(tempDrawCard, " ");
        }
        else{
            this.machineCards.set(tempDrawCard, " ");
        }
        return tempDrawCard.getImagePathway();
    }
    determineMachineMove(){
        console.log(this.machineCards);
        let machineSays = new Array();
        let tempCard;
        let tempArr = this.machineCards.keys();
        let tempIndex;
        console.log("top card: " + this.topCard);
        for(let i = 0; i < this.machineCards.size; i++){
            tempCard = tempArr.next().value;
            console.log(tempCard);
            if(tempCard.getSuit() === this.topCard.getSuit() || tempCard.getValue() === this.topCard.getValue()){
                this.processCardPlayed(tempCard, false);
                console.log(i);
                tempIndex = i;
                break;
            }
            tempCard = undefined;
        }
        if(tempCard == undefined){
            console.log("undefined");
            machineSays.push(this.drawCard(false));
            this.playersTurn=true;
            machineSays.push(false);
            return machineSays;
        }
        let tempActionTakenArr = new Array();
        for(let i = 0; i < this.cardRuleArray.length; i++){
            let tempCardRule = this.cardRuleArray.at(i);
            console.log(tempCardRule);
            if(!tempCardRule.cardRuleSatisfied(tempCard, tempActionTakenArr)){
                machineSays.push(tempCardRule.getActionNeeded());
            }
        }
        console.log(tempCard.getSuit() + " " + tempCard.getValue());
        if(tempCard.getSuit()===("spades")){
            machineSays.push(tempCard.getValue().toLowerCase() + " of spades");
        }
        if(tempCard.getValue()===("seven")){
            machineSays.push("have a nice day");
        }
        if(this.machineCards.length == 1){
            machineSays.push("mao");
        }
        if(tempCard.getValue()===("king")){
            machineSays.push("All hail king of " + tempCard.getSuit());
        }
        console.log(machineSays);
        machineSays.push(tempCard.getImagePathway());
        machineSays.push(tempIndex);
        machineSays.push(true);
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