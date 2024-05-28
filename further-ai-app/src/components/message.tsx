import React from 'react';

interface MessageProps {
    text: string;
    isResponse?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isResponse = false }) => {
    return (
        <div className={`message ${isResponse ? 'response' : 'user-message'}`}>
            <div className="message-icon">
                {isResponse ? (
                    <img src="/path-to-ai-icon.png" alt="AI" className="ai-icon" />
                ) : (
                    <img src="/path-to-user-icon.png" alt="User" className="user-icon" />
                )}
            </div>
            <div className="message-text">{text}</div>
        </div>
    );
};

export default Message;