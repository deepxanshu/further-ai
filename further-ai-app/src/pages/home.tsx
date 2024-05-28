// src/pages/home.tsx
import React, { useState } from 'react';
import Header from '../components/header';
import ChatSidebar from '../components/chat-side-bar';
import ChatBox from '../components/chat-box';
import { Message } from '../models/message';

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
            <Header title={`Chat ${activeChat + 1}`} />
            <div className="main-content">
                <ChatSidebar
                    chats={chats.map((_, index) => `Chat ${index + 1}`)}
                    onSelectChat={setActiveChat}
                    onNewChat={handleNewChat}
                />
                <ChatBox
                    messages={chats[activeChat]}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Home;