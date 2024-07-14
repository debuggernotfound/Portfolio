import React from "react";
import{
    atom
} from 'jotai';
function GameStates(){
    return "";
}
export const machineHandStart = atom([]
 // replace with await server side 
);
export const machineHandState = atom(["three_of_clubs", "three_of_spades", "queen_of_hearts"]
);
export const playerHandStart = atom(
);
export const playerHandState = atom(    ["ace_of_hearts", "king_of_spades", "ten_of_spades", "two_of_hearts", "two_of_spades"]
);
export default GameStates;