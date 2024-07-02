import Card from './card.js';

class Deck{
    constructor(numberOfDecks){
        const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
        const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]

        this.numCards = 52*numberOfDecks
        this.cards = new Array(this.numCards);
        for(let i = 0; i < numberOfDecks; i++){
            for(let j = 0; j < 13; j++){
                for(let k = 0; k < 4; k++){
                    this.cards[i*52 + j*4 + k] = new Card(suits[k], values[j]);
                }
            }
            
        }
    }
    shuffle(){
        for(let i = this.numCards - 1; i > 0; i--){
            let chosen = Math.floor(Math.random()*(i-1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[chosen];
            this.cards[chosen] = temp;
        }
        for(let i = 0; i < this.numCards; i++){
            console.log(this.cards[i].toString());
        }
    }
}
let d1 = new Deck(1);
d1.shuffle();
export default Deck;