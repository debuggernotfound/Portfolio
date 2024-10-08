import Card from './card.js';

class CardRule{
    constructor(iS, givenSuitOrValue, actionNeeded){
        this.isSuit = iS;
        this.givenSuitOrValue = givenSuitOrValue;
        this.actionNeeded = actionNeeded;
    }
    getActionNeeded(){
        return this.actionNeeded;
    }
    getGivenSuitOrValue(){
        return this.givenSuitOrValue;
    }
    getisSuit(){
        return this.isSuit;
    }
    cardRuleSatisfied(card, actionTaken){
        if(this.isSuit){
            if(card.getSuit()===(this.givenSuitOrValue)){
                let indexOfAction = actionTaken.indexOf(this.actionNeeded);
                if(indexOfAction != -1){
                    actionTaken[indexOfAction] = "action_processed";
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        else{
            if(card.getValue()===(this.givenSuitOrValue)){
                let indexOfAction = actionTaken.indexOf(this.actionNeeded);
                if(indexOfAction != -1){
                    actionTaken[indexOfAction] = "action_processed";
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        return true;
    }
}
export default CardRule;