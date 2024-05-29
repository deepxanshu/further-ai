
import React from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';

interface MessageProps {
    text: string;
    isResponse?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isResponse = false }) => {
    return (
        <div className={`message ${isResponse ? 'response' : 'user-message'}`}>
            <div className="message-icon">
                {isResponse ? (
                    <FontAwesomeIcon icon="wand-magic-sparkles" className='ai-icon'/>
                ) : (
                    <FontAwesomeIcon icon="user" size='xl' className='user-icon'/>
                )}
            </div>
            <div className="message-text">{text}</div>
        </div>
    );
};

export default Message;