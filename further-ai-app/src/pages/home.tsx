import React, { useState } from 'react';
import Header from '../components/header';
import ChatSidebar from '../components/chat-side-bar';
import ChatBox from '../components/chat-box';
import { Message } from '../models/message';
import logo from '../assests/further-ai-logo.svg';
import { FontAwesomeIcon } from '../config/font-awesome';

const Home: React.FC = () => {
    const [chats, setChats] = useState<Record<number, Message[]>>({ 1: [] });
    const [activeChat, setActiveChat] = useState(1);

    const handleNewChat = () => {
        const newChatId = Object.keys(chats).length + 1;
        setChats({ ...chats, [newChatId]: [] });
        setActiveChat(newChatId);
    };

    const handleSendMessage = (chatId: number, message: Message) => {
        setChats(prevChats => ({
            ...prevChats,
            [chatId]: [...prevChats[chatId], message]
        }));
    };

    return (
        <div className="home">
            <div className="sidebar">
                <div className="logo-newchat">
                    <img src={logo} alt="Further AI" className="logo" onClick={() => window.location.href = 'https://www.furtherai.com/'} />
                    <button onClick={handleNewChat} className="new-chat-button"><FontAwesomeIcon icon="plus" size='lg'/></button>
                </div>
                <ChatSidebar
                    chats={Object.keys(chats).map((id) => `Chat ${id}`)}
                    onSelectChat={(chatIndex) => setActiveChat(Number(chatIndex) + 1)}
                />
            </div>
            <div className="chat-area">
                <Header title={`Chat ${activeChat}`} />
                <ChatBox
                    chatId={activeChat+1}
                    messages={chats[activeChat]}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Home;


