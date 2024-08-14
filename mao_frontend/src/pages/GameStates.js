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
export const machineHandState = atom([]);

export const gameIDState = atom("");

export const lastIndexOfActionArrayState = atom(0);

export const playerPlayedCardState = atom("");

export const chatBoxFilledState = atom("");

export const chatsInChatBoxState = atom(new Array());

export const playerHandState = atom([]);

export const topCardState = atom("four_of_clubs");

export const lastRemovedCardState = atom("");

export const machinePlayedCardState = atom("four_of_clubs");

export const whoWonState = atom("");

// export const urlUsed = atom("http://localhost:3001/api/v1/game/");
export const urlUsed = atom("https://gameofmaobackendlinux.azurewebsites.net/api/v1/game/");

export const tutorialSpeechTextState = atom("Welcome to the tutorial! Click the \"next\" button to begin.");

export const tutorialStepState = atom(-1);

export const speechBubblePositionState = atom({'width':`${20}%`, 'top':`${4}%`, 'left':`${2}%`});

export const speechBubbleButtonState = atom("Next");

export const creditsShownState = atom(false);

export default GameStates;