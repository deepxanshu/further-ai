import React from 'react';

interface NewChatButtonProps {
    onNewChat: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onNewChat }) => {
    return <button onClick={onNewChat}>+ New Chat</button>;
};

export default NewChatButton;