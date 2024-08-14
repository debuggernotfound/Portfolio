import React from "react";
import './home.css';
import {useNavigate} from 'react-router-dom';
import Hand from "./HandOfCards.js";
import TopCard from "./topCard.js";
import topDeckCard from './TopDeckCard.js';
import{ 
   useAtomValue, 
   useAtom
} from 'jotai';
import {speechBubbleButtonState, speechBubblePositionState, tutorialSpeechTextState, tutorialStepState} from "./GameStates.js";
import ChatBox from './ChatBox.tsx';
import EndButton from './endButton.js';

function Tutorial(){
    let navigate = useNavigate();
    let tutorialMachineHandState = new Array(14);
    tutorialMachineHandState.fill("flipped_card");
    let tutorialPlayerHandState = ["four_of_spades", "seven_of_diamonds", "king_of_clubs", "jack_of_clubs", "ten_of_hearts", "ten_of_spades", "five_of_diamonds"];
    const [tutorialSpeechText, setTutorialSpeechText] = useAtom(tutorialSpeechTextState);
    const [speechBubblePosition, setSpeechBubblePosition] = useAtom(speechBubblePositionState);
    const [tutorialStep, setTutorialStep] = useAtom(tutorialStepState);
    const [speechBubbleButton, setSpeechBubbleButton] = useAtom(speechBubbleButtonState);
    const textSteps = [
        "You are dealt seven cards (shown to the right) while the machine (affectionately named Jerry the Machine) is given fourteen.", 
        "The goal is to get rid of all of your cards. You can only play one card per turn.",
        "When the game starts, it is your turn.",
        "You can play a card by clicking one of the cards in your hand.",
        "Besides these basics, there are a few generated rules that you'll have to figure out on your own.", 
        "Some of these rules will make you type a specific phrase in the chat (below).",
        "After you're done typing AND played a card, click the \"End Turn\" button (below) to end your turn.",
        "If your messages don't follow the rules, Jerry will give you a one card penalty. Jerry will explain your penalty in this chat",
        "If you don't have any cards to play, you can click the deck (shown to the left) to draw a card. This will automatically end your turn.",
        "You don't know any of the rules and Jerry knows all the rules, so he's given double the amount of cards that you have. However, winning against Jerry is still tough.",
        "That's it! Good luck :)"
    ];
    const positionSteps = [
        {'width':`${18}%`, 'top':`${70}%`, 'left':`${21}%`},
        {'width':`${18}%`, 'top':`${73}%`, 'left':`${21}%`},
        {'width':`${18}%`, 'top':`${83}%`, 'left':`${44}%`},
        {'width':`${25}%`, 'top':`${83}%`, 'left':`${40.5}%`},
        {'width':`${20}%`, 'top':`${4}%`, 'left':`${2}%`},
        {'width':`${20}%`, 'top':`${55}%`, 'left':`${78}%`},
        {'width':`${20}%`, 'top':`${55}%`, 'left':`${2}%`},
        {'width':`${20}%`, 'top':`${50}%`, 'left':`${78}%`},
        {'width':`${18}%`, 'top':`${35}%`, 'left':`${63}%`},
        {'width':`${20}%`, 'top':`${5}%`, 'left':`${65}%`},
        {'width':`${18}%`, 'top':`${4}%`, 'left':`${2}%`}
    ];
    const handleClick = () => {
        let toSetStep = tutorialStep + 1;
        if(tutorialStep < textSteps.length - 2){
            setTutorialSpeechText(textSteps[tutorialStep + 1]);
            setSpeechBubblePosition(positionSteps[tutorialStep + 1]);
            setTutorialStep(toSetStep);
        }
        else if(tutorialStep == textSteps.length - 2){
            setTutorialSpeechText(textSteps[tutorialStep + 1]);
            setSpeechBubblePosition(positionSteps[tutorialStep + 1]);
            setTutorialStep(toSetStep);
            setSpeechBubbleButton("Done");
        }
        else{
            navigate("/");
        }
        
    }
    return(
        <div className="table">
            <div className="window-screen">
                <div className="speech-bubble" style={speechBubblePosition}>
                    {tutorialSpeechText}
                    <button className="speech-next-button" onClick={handleClick}>{speechBubbleButton}</button>
                </div>
            </div>
            {ChatBox()}
            {Hand(tutorialMachineHandState, true)}
            {topDeckCard()}
            {TopCard()}
            {Hand(tutorialPlayerHandState, false)}
            {EndButton()}
        </div>
    );
}
export default Tutorial;