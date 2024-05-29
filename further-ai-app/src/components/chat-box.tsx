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
        onSendMessage(message, false);  // User message
        setTimeout(() => {
            onSendMessage('This is a static response.', true);  // AI response
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