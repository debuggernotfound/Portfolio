import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
function Game(){
    let navigate = useNavigate();
    return(
        <div className="Page">
            <div className = "Title">Hello World</div>
        </div>
    );
}
export default Game;
