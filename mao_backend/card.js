class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
    getSuit(){
        return this.suit;
    }
    getValue(){
        return this.value;
    }
    toString(){
        return this.value + " of " + this.suit;
    }
}
export default Card;