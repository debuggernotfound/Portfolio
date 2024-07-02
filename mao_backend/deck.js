class Deck{
    constructor(numberOfDecks){
        const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
        const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
        let numCards = 52*numberOfDecks
        this.cards = new Array(numCards);
        for(let i = 0; i < numberOfDecks; i++){
            for(let j = 0; j < 13; j++){
                for(let k = 0; k < 4; k++){
                    this.cards[i*52 + j*4 + k] = new Card()
                }
            }
            
        }
    }
    shuffle(){

    }
}