import React, {useState} from 'react';
import { FontAwesomeIcon } from '../config/font-awesome';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showCopyPopup, setShowCopyPopup] = useState(false);

    const handleInfoClick = () => {
        setShowInfo(!showInfo);
    }
    const handleShareClick = () => {
        const shareUrl = 'https://localhost:3000';
        navigator.clipboard.writeText(shareUrl).then(() => {
            setShowCopyPopup(true);
            setTimeout(() => {
                setShowCopyPopup(false);
            }, 2000);
        }).catch((error) => console.error('Error copying link:', error));
    };

    return (
        <div className="header">
            <div className="title-section">
            <FontAwesomeIcon icon={['far', 'comment']} size='xl' style={{ marginRight: '10px' }}/>
                <h3>{title}</h3>
            </div>
            <div className='right-section'>
                <button className="ellipsis-button" onClick={handleInfoClick}>
                    <FontAwesomeIcon icon="ellipsis" style={{ marginRight: '10px' }}/>
                    </button>
                    <button className="share-button" onClick={handleShareClick}>
                        <FontAwesomeIcon icon="arrow-up-from-bracket"/>
                        </button>
            </div>
            {showInfo && (
            <div className="info-popup">
                <p>further-ai take home hacking</p>
                </div>
            )}
            {showCopyPopup && (
                <div className="copy-popup">
                    <p>Link copied!</p>
                </div>
            )}               
        </div>
    );
};

export default Header;