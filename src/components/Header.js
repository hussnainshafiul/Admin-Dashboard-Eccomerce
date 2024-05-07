import React from 'react';
import './Header.css'; // Make sure to include the CSS file for styles

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="logo.png" alt="Dashboard" className="logo-img" />
                <span>12 Oct 2023</span>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button>🔍</button>
            </div>
            <div className="icons">
                <button>🔔</button>
                <button>⚙️</button>
                <button>🌍</button>
            </div>
            <div className="user-profile">
                <img src="path_to_image.jpg" alt="John Smith" className="profile-img" />
                <span>John Smith</span>
            </div>
        </header>
    );
};

export default Header;
