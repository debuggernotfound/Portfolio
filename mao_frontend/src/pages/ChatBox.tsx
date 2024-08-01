import React, {useEffect, useRef} from 'react';
import {atom, useAtom} from 'jotai';
import "./ChatBox.css";
import { chatsInChatBoxState, chatBoxFilledState } from './GameStates';

function ChatBox(){
    const [filled, setFilled] = useAtom(chatBoxFilledState);
    const [chatsInChatBox, setChatsInChatBox] = useAtom(chatsInChatBoxState);
    const handleSubmit = (e) => {
        e.preventDefault();
        let changedArr = [...chatsInChatBox];
        changedArr.push({person: "You", message: filled, messageStyle:{'right': `${2}%`}});
        setChatsInChatBox(changedArr);
        setFilled("");
    }
    const chatDisplayContainer = useRef<HTMLDivElement>(null)
    const autoScroll = () => {
        const{offsetHeight, scrollHeight, scrollTop} = chatDisplayContainer.current as HTMLDivElement;
        if(scrollHeight <= scrollTop + offsetHeight + 100){
            chatDisplayContainer.current?.scrollTo(0, scrollHeight);
        }
    }
    useEffect(() => {
        autoScroll()
    }, [chatsInChatBox])

    const imagePath = './send.png';
    return(
        <div>
            <div className="chat_display" ref={chatDisplayContainer}>
                {chatsInChatBox.map(messageObject => {
                    return(
                    <div>
                        <div className="message_id" style={messageObject.messageStyle}>
                            {messageObject.person}
                        </div>
                        <div className="message" style={messageObject.messageStyle}>
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