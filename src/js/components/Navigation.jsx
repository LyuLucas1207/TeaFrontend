// src/js/components/Navigation.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../css/components/Navigation.css';

const Navigation = ({ isDarkTheme }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="nav_navbar">
            <div className="nav_navbar-container">
                <div className={`nav_navbar-logo ${isDarkTheme ? 'dark' : 'light'}`}>
                    <Link to="/"></Link>
                </div>

                <div className={`nav_navbar-links ${isMobileMenuOpen ? 'nav_mobile-menu-open' : ''}`}>
                    <Link to="/products">产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</Link>
                    <Link to="/about">关&nbsp;于&nbsp;我&nbsp;们</Link>
                    <Link to="/services">新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闻</Link>
                    <Link to="/contact">联&nbsp;系&nbsp;我&nbsp;们</Link>
                </div>

                <div className={`nav_hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Navigation;