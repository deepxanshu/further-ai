import React from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';

interface SuggestionsProps {
    suggestions: string[];
    onSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, onSuggestionClick }) => {
    return (
        <div className="suggestions">
            {suggestions.map((suggestion, index) => (
                <button 
                    key={index} 
                    className="suggestion-button" 
                    onClick={() => onSuggestionClick(suggestion)}
                >
                    <FontAwesomeIcon icon="hand-sparkles" style={{ paddingRight: '10px' }}/>
                    <b>{suggestion}</b>
                </button>
            ))}
        </div>
    );
};

export default Suggestions;