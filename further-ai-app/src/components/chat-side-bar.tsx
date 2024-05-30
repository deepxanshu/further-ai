import React from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';

interface ChatSidebarProps {
    chats: string[];
    onSelectChat: (index: number) => void;
    // onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onSelectChat }) => {
    return (
        <div>
            <ul className="chat-list">
                {chats.map((chat, index) => (
                    <li key={index} onClick={() => onSelectChat(index)} className="chat-tab">
                        <FontAwesomeIcon icon={['far', 'comment']} style={{ marginRight: '10px' }}/>
                        {chat}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSidebar;