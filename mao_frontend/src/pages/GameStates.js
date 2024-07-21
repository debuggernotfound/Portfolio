import React from "react";
import { useQuery } from '@tanstack/react-query';
import{
    atom
} from 'jotai';

function GameStates(){
    // console.log(getInitialMachineHandNumber());
    return "";
}
// async function getInitialMachineHandNumber(){
//     const res = await fetch('http://localhost:3001/initial-machine-hand');
//     if (!res.ok){
//         throw new Error('network error');
//     }
//     const num = await res.json();
//     return num;
//     // const fetchData = async() => {const result = await fetch('http://localhost:3001/initial-machine-hand')}
//     // let num = await fetch('http://localhost:3001/initial-machine-hand');
//     // return num;
// }
// export const fetchInitialMachineHandNumber = async() => {
//     const res = await fetch('http://localhost:3001/initial-machine-hand');
//     if (!res.ok){
//         throw new Error('network error');
//     }
//     const data = await res.json();
// }


// export const machineHandState = () => {return useQuery(['initialMachineHand'], getInitialMachineHandNumber)};
export const machineHandState = atom(
    21
    //replace with get machineHandState
);

export const chatBoxFilledState = atom("");

export const chatsInChatBoxState = atom(new Array());

export const playerHandState = atom(["ace_of_hearts", "king_of_spades", "ten_of_spades", "two_of_hearts", "two_of_spades"]);

export const topCardState = atom("four_of_clubs");

export const lastRemovedCardState = atom("");

export default GameStates;