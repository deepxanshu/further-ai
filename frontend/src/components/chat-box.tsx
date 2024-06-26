import React, { useState } from 'react';
import { Message } from '../models/message';
import MessageComponent from './message';
import InputBox from './input-box';
import useWebSocket from '../hooks/useWebSocket';
import { sendMessage as sendApiMessage } from '../api';

interface ChatBoxProps {
    chatId: number;
    messages: Message[];
    onSendMessage: (chatId: number, message: Message) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, messages, onSendMessage }) => {
    // const { messages: wsMessages, sendMessage: sendWsMessage } = useWebSocket(chatId);
    const [ suggestions ] = useState<string[]>(["Recommend Resources", "Eludicate my answer"]);
    const handleSendMessage = async (message: string) => {
        const userMessage: Message = { text: message, isResponse: false };
        onSendMessage(chatId, userMessage);
        // sendWsMessage(message);
        try {
            const response = await sendApiMessage(chatId, message);
            const aiMessages = response.messages.filter((msg: any) => msg.sender === 'ai');
            const latestAiMessage = aiMessages[aiMessages.length - 1];
            if (latestAiMessage) {
                const aiMessage: Message = { text: latestAiMessage.content, isResponse: true };
                onSendMessage(chatId, aiMessage);
                // sendWsMessage(latestAiMessage.content);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSendMessage(suggestion);
    };

    const allMessages = [
        ...messages.map((msg) => ({ ...msg, isResponse: msg.isResponse })),
        // ...wsMessages.map((msg) => ({ text: msg, isResponse: true })),
    ];

    const lastMessageIndex = allMessages.length - 1;
    const lastMessage = allMessages[lastMessageIndex];

    return (
        <div className="chat-box">
            <div className="messages">
                {allMessages.map((msg, index) => (
                    <MessageComponent key={index} text={msg.text} isResponse={msg.isResponse}
                    suggestions={index===lastMessageIndex && msg.isResponse ? suggestions : []} onSuggestionClick={handleSuggestionClick}/>
                ))}
            </div>
            <InputBox onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatBox;