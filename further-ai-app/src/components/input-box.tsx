import React, { useState } from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';

interface InputBoxProps {
    onSendMessage: (message: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Uploaded file:', file);
        }
    };

    return (
        <div className="input-box">
            <label className="upload">
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                <FontAwesomeIcon icon="plus" />
            </label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Chat with me..."
            />
            <button className="enter" onClick={handleSend}>
                <FontAwesomeIcon icon="arrow-turn-down" rotation={90}/>
            </button>
        </div>
    );
};

export default InputBox;