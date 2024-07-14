import React from "react";
import {
    atom, 
    useAtomValue
} from 'jotai';
import {machineHandState} from "./GameStates.js";
import {playerHandState} from "./GameStates.js";
import Hand from "./HandOfCards.js";
import Card from "./Card.tsx";
function Table(){
    // const machineHand = useRecoilValue(machineHandState);
    // const playerHand = useRecoilValue(playerHandState);

    return(
        <div>
            {Hand(useAtomValue(machineHandState), true)}
            {Hand(useAtomValue(playerHandState), false)}
        </div>
    );
}
export default Table;