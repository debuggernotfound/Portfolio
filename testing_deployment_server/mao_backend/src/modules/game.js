import Deck from "./deck.js";
import CardRule from "./card_rules.js";
class Game {
    constructor(){
        //create id
        this.ID = Math.floor(Math.random()*1000000);
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
        //initialize past card array
        this.pastCards = new Array();
        //create random card rule set
        this.totalCardRules=[
            {"type": "suitOrValue", "isSuit": true, "validKeys": ["diamonds"], "penalty": "Cultural appropriation", "suitOrValueNeeded": true, "actionNeeded": {"ace": "uno", "two": "dos", "three": "tres", "four": "cuatro", "five": "cinco", "six": "seis", "seven": "siete", "eight": "ocho", "nine": "nueve", "ten": "diez", "jack": "once", "queen": "doce", "king": "trece"}},
            {"type": "suitOrValue", "isSuit": false, "validKeys": ["queen"], "penalty": "Didn't care about the monkey", "suitOrValueNeeded": false, "actionNeeded": "where's the monkey?"},
            {"type": "suitOrValue", "isSuit": false, "validKeys": ["ace"], "penalty": "Didn't find the monkey", "suitOrValueNeeded": false, "actionNeeded": "there's the monkey!"},
            {"type": "suitOrValue", "isSuit": false, "validKeys": ["two", "three", "five", "seven", "jack", "king"], "penalty": "Failure to be good at maths", "suitOrValueNeeded": false, "actionNeeded": "prime"}, 
            {"type": "suitOrValue", "isSuit": false, "validKeys": ["ace", "five", "ten"], "penalty": "Failure to dispense wise sayings", "suitOrValueNeeded": false, "actionNeeded": "rome wasn't built in a day"},
            {"type": "suitOrValue", "isSuit": false, "validKeys": ["jack"], "penalty": "Failure to be polite", "suitOrValueNeeded": false, "actionNeeded": "knock knock"},
            {"type": "value sequence", "numberOfValuesToCheck": 2, "validValues": [["jack", "ace"], ["jack", "two"], ["jack", "three"], ["jack", "four"], ["jack", "five"], ["jack", "six"], ["jack", "seven"], ["jack", "eight"], ["jack", "nine"], ["jack", "ten"], ["jack", "queen"], ["jack", "king"]], "penalty": "Failure to open the door to such a gentleman", "actionNeeded": "who's there?"},
            {"type": "value sequence", "numberOfValuesToCheck": 3, "validValues": [["ace", "ace", "nine"]], "penalty": "Failure to save lives", "actionNeeded": "emergency emergency!"},
            {"type": "value sequence", "numberOfValuesToCheck": 2, "validValues": [["ace", "seven"], ["seven", "ace"], ["two", "six"], ["six", "two"], ["three", "five"], ["four", "four"]], "penalty": "Failure to do basic arithmetic", "actionNeeded": "maths"},
            {"type": "suit sequence", "numberOfValuesToCheck": 5, "validValues": [["heart", "heart", "heart", "heart", "heart"]], "penalty": "Failure to introduce the queen in Alice of Wonderland", "actionNeeded": "welcome, queen of hearts"}
        ]
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
        this.playersTurn = !this.playersTurn;
        this.pastCards.push(cardPlayed);
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
            // console.log("Card penalty reasons: " + cardPenaltyReasons);
            return cardPenaltyReasons;
        }
        if(!this.processCardPlayed(cardPlayed, true)){
            cardPenaltyReasons.push("Must play card that is either the same suit or same value as the top card.");
            this.playerCards = this.playerCards.set(this.drawCard(true), " ");
            return cardPenaltyReasons;
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