// src/components/chat-box.tsx
import React from 'react';
import { Message } from '../models/message';
import MessageComponent from './message';
import InputBox from './input-box';

interface ChatBoxProps {
    messages: Message[];
    onSendMessage: (message: string, isResponse?: boolean) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage }) => {
    const handleSendMessage = (message: string) => {
        onSendMessage(message, false);  // This message is from the user
        setTimeout(() => {
            onSendMessage('This is a static response.', true);  // This message is from the AI
        }, 500);
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <MessageComponent key={index} text={msg.text} isResponse={msg.isResponse} />
                ))}
            </div>
            <InputBox onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatBox;