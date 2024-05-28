import React from 'react';

interface ChatSidebarProps {
    chats: string[];
    onSelectChat: (index: number) => void;
    onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat, onNewChat }) => {
    return (
        <div className="sidebar">
            <button onClick={onNewChat}>+ New Chat</button>
            <ul>
                {chats.map((chat, index) => (
                    <li key={index} onClick={() => onSelectChat(index)}>
                        Chat {index + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;