import React from "react";
import {
    atom, 
    useAtomValue
} from 'jotai';
import {machineHandState, playerHandState, topCardState} from "../GameStates.js";
import Hand from "../HandOfCards.js";
import Card from "../PlayerCard.tsx";
import "./Table.css";
function Table(){
    // const machineHand = useRecoilValue(machineHandState);
    // const playerHand = useRecoilValue(playerHandState);

    return(
        <div classHand = "table">
            {Hand(useAtomValue(machineHandState), true)}
            {/* {Card(0, useAtomValue(topCardState), false)}
            {Hand(useAtomValue(playerHandState), false)} */}
        </div>
    );
}
export default Table;