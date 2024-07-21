import React from 'react';
import {atom, useAtom} from 'jotai';
import "./ChatBox.css";
import { chatsInChatBoxState, chatBoxFilledState } from './GameStates';

function ChatBox(){
    const [filled, setFilled] = useAtom(chatBoxFilledState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const handleSubmit = (e) => {
        e.preventDefault();
        let changedArr = [...chatsInChatBox];
        changedArr.push({person: "You", message: filled});
        setChatsInChatBox(changedArr);
        setFilled("");
    }
    const imagePath = './send.png';
    return(
        <div>
            <div className="chat_display">
                {chatsInChatBox.map(messageObject => {
                    return(
                    <div>
                        <div className="message_id">
                            {messageObject.person}
                        </div>
                        <div className="message">
                            {messageObject.message}
                        </div>
                    </div>
                    );
                })}
            </div>
            <form className="chat_form" onSubmit={handleSubmit}>
                 <input
                    className="chat_box"
                    type="text"
                    name="messages"
                    value={filled}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            handleSubmit(e);
                        }
                    }}
                    onChange={(e) => setFilled(e.target.value)}
                    />
                <button type="submit" className="submit_button">
                    <img src = {imagePath} alt="send" className="submit_image"/>
                </button>
            </form>
        </div> 
    );
}
export default ChatBox;