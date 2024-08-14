import React from "react";
import './home.css';
import { creditsShownState } from "./GameStates";
import { useAtom } from "jotai";
function Credits(){
    const [creditsShown, setCreditsShown] = useAtom(creditsShownState);
    const handleCreditClick = () => {
        setCreditsShown(false);
    }
    return(
        <div className="credits">
            <button className="credits-button" onClick={handleCreditClick}>
                <img src = {"./x_picture.png"} alt="x" className="credits-image"/>
            </button>
            <text>
            Hello! My name is Grace Tan.<br/>
            This game is based off of a traditional playing card game that I love. <br/>
            This is my first full stack project, with a frontend built using React and a backend built using NodeJS. 
            I thought it would be fun to learn the basics of web development tools, and built this in approximately one month without the use of generative AI. <br/>
            There are still a few features I'd like to implement, and I'd love any feedback you'd like to offer! <br/>
            Feel free to contact me at cs.grace.t@gmail.com.
            </text>
        </div>
    );
}
export default Credits;