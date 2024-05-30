import React, { useState } from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';
import Suggestions from './suggestions';

interface MessageProps {
    text: string;
    isResponse?: boolean;
    suggestions?: string[];
    onSuggestionClick?: (suggestion: string) => void;
}

const Message: React.FC<MessageProps> = ({ text, isResponse = false, suggestions = [], onSuggestionClick }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
        if (disliked) {
            setDisliked(false);
        }
    };

    const handleDislikeClick = () => {
        setDisliked(!disliked);
        if (liked) {
            setLiked(false);
        }
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div>
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
        {isResponse && (
                <div className='actions'>
                    <button className={`action-button ${liked ? 'active' : ''}`} onClick={handleLikeClick}>
                        <FontAwesomeIcon icon={['far', 'thumbs-up']} />
                    </button>
                    <button className={`action-button ${disliked ? 'active' : ''}`} onClick={handleDislikeClick}>
                        <FontAwesomeIcon icon={['far', 'thumbs-down']} />
                    </button>
                    <button className="action-button" onClick={handleCopyClick}>
                        <FontAwesomeIcon icon={['far', 'clipboard']}  />
                    </button>
                </div>
            )}
        {isResponse && suggestions.length > 0 && onSuggestionClick && (
            <div className='suggestion-box'>
                <Suggestions suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
            </div>
        )}
        </div>
    );
};

export default Message;