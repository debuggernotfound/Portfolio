import Card from './card.js';

class Deck{
    constructor(numberOfDecks, shuffledOrNot){
        const suits = ["clubs", "spades", "diamonds", "hearts"];
        const values = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"]
        this.currentDrawPosition = 0; 
        this.numCards = 52*numberOfDecks
        this.cards = new Array(this.numCards);
        for(let i = 0; i < numberOfDecks; i++){
            for(let j = 0; j < 13; j++){
                for(let k = 0; k < 4; k++){
                    this.cards[i*52 + j*4 + k] = new Card(suits[k], values[j]);
                }
            } 
        }
        if(shuffledOrNot){
            this.shuffle();
        }
    }

    shuffle(){
        for(let i = this.numCards - 1; i > 0; i--){
            let chosen = Math.floor(Math.random()*(i-1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[chosen];
            this.cards[chosen] = temp;
        }
    }
    draw(numberToDraw){
        let toReturn;
        let remainingCards = this.numCards - this.currentDrawPosition;
        if(numberToDraw > remainingCards){
            toReturn = new Array(this.numCards - this.currentDrawPosition);
            for(let i = this.currentDrawPosition; i < this.numCards; i++){
                toReturn[i - this.currentDrawPosition] = this.cards[i];
            }
            numberToDraw = numberToDraw - remainingCards;
            let wholeDecks = Math.floor(numberToDraw/this.numCards);
            for(let i = 0; i < wholeDecks ; i++){
                this.shuffle();
                toReturn = toReturn.concat(this.cards);
            }
            numberToDraw = numberToDraw % this.numCards; 
            this.shuffle();
            let tempArr = new Array(numberToDraw);
            for(let i = 0; i < numberToDraw; i++){
                tempArr[i] = this.cards[i];
            }
            toReturn = toReturn.concat(tempArr);
            this.currentDrawPosition = numberToDraw;
        }
        else{
            toReturn = new Array(numberToDraw);
            for(let i = this.currentDrawPosition; i < numberToDraw + this.currentDrawPosition; i++){
                toReturn[i - this.currentDrawPosition] = this.cards[i];
            }
            this.currentDrawPosition = numberToDraw + this.currentDrawPosition;
        }
        return toReturn;
    }
}
export default Deck;