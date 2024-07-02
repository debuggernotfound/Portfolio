import React from 'react';
import './home.css';
import {useNavigate} from 'react-router-dom';
function Home(){
    let navigate = useNavigate();
    return(
        <div className="Page">
            <div className = "Title">Mao</div>
            <button className="Play" onClick={() => navigate("/game")}>Play</button>
        </div>
    );
}
export default Home;
