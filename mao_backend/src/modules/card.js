class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.image_pathway = value + "_of_" + suit;
    }
    getImagePathway(){
        return this.image_pathway;
    }
    getSuit(){
        return this.suit;
    }
    getValue(){
        return this.value;
    }
    toString(){
        return this.image_pathway;
    }
}
export default Card;