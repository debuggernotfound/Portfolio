import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
function End(){
    let navigate = useNavigate();
    return(
        <div className="page">
            <div className = "title">You Won!</div>
            <button className="btn" onClick={() => navigate("/")}>Go Back Home</button>
            {/* <button className="btn" onClick={() => [initializeServerGame(), navigate("/game")]}>Play</button>
            <button className="btn">Rules</button> */}
        </div>
    );
}
// async function initializeServerGame(){
//     let returned = await fetch('http://localhost:3001/initialize-game');
//     return true;
// }
export default End;