package com.mao.mao;

public class Deck {
    private final String[] Suits = {"Clubs", "Spades", "Diamonds", "Hearts"};
    private final String[] Numbers = {"Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"};
    private String[] cards;
    public Deck(){
        cards = new String[52];
        for(int i = 0; i < 13; i++){
            for(int j = 0; j < 4; j++){
                cards[i*4 + j] = Numbers[i] + " of " + Suits[j];
            }
        } 
    }
    public String[] shuffle(){
        String[] cardsOfDeck = this.cards;
        
    }
    public static ArrayList<String> drawCards(int n){

    }
}
