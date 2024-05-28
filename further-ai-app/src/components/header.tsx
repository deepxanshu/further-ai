import React from 'react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className="header">
            <div className="title-section">
                <img src="/path-to-logo.png" alt="Further AI" className="logo" />
                <h1>{title}</h1>
            </div>
            <button className="share-button">
                <img src="/path-to-share-icon.png" alt="Share" className="share-icon" />
            </button>
        </div>
    );
};

export default Header;