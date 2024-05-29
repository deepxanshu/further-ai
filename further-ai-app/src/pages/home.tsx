import React, { useState } from 'react';
import Header from '../components/header';
import ChatSidebar from '../components/chat-side-bar';
import ChatBox from '../components/chat-box';
import { Message } from '../models/message';
import logo from '../assests/further-ai-logo.svg'
import { FontAwesomeIcon } from '../config/font-awesome';

const Home: React.FC = () => {
    const [chats, setChats] = useState<Message[][]>([[]]);
    const [activeChat, setActiveChat] = useState(0);

    const handleSendMessage = (message: string, isResponse: boolean = false) => {
        const newChats = [...chats];
        newChats[activeChat].push({ text: message, isResponse });
        setChats(newChats);
    };

    const handleNewChat = () => {
        setChats([...chats, []]);
        setActiveChat(chats.length);
    };

    return (
        <div className="home">
            <div className="sidebar">
                <div className="logo-newchat">
                    <img src={logo} alt="Further AI" className="logo" />
                    <button onClick={handleNewChat} className="new-chat-button"><FontAwesomeIcon icon="plus" size='lg'/></button>
                </div>
                <ChatSidebar
                    chats={chats.map((_, index) => `Chat ${index + 1}`)}
                    onSelectChat={setActiveChat}
                    onNewChat={handleNewChat}
                />
            </div>
            <div className="chat-area">
                <Header title={`Chat ${activeChat + 1}`} />
                <ChatBox
                    messages={chats[activeChat]}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Home;