import React from 'react';
import { Message } from '../models/message';
import MessageComponent from './message';
import InputBox from './input-box';
import useWebSocket from '../hooks/useWebSocket';

interface ChatBoxProps {
    chatId: number;
    messages: Message[];
    onSendMessage: (chatId: number, message: Message) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, messages, onSendMessage }) => {
    const { messages: wsMessages, sendMessage: sendWsMessage } = useWebSocket(chatId);

    const handleSendMessage = async (message: string) => {
        const userMessage: Message = { text: message, isResponse: false };
        onSendMessage(chatId, userMessage);
        sendWsMessage(message);  // Send via WebSocket
    };

    const allMessages = [
        ...messages,
        ...wsMessages,
    ];

    return (
        <div className="chat-box">
            <div className="messages">
                {allMessages.map((msg, index) => (
                    <MessageComponent key={index} text={msg.text} isResponse={msg.isResponse} />
                ))}
            </div>
            <InputBox onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatBox;