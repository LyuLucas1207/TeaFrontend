// 引入组件
import React from 'react';
import { Link } from 'react-router-dom';

import Components from '../../components/components';

// 引入样式文件
import './style.css';

// 引入自定义 Hook 和工具函数
import { useTheme } from '../../utils/helpers/myUse';
import { validateUrl } from '../../utils/helpers/validate';


function classifyLink(link) {
    const linkStyle = {
        top: '50px',
        fontSize: '1.2rem',
        color: 'var(--link-text-color)',
        backgroundColor: 'var(--link-bg-color)',
        textDecoration: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    };

    const linkHoverStyle = {
        backgroundColor: 'var(--link-hover-bg-color)',
        boxShadow: '0 6px 14px rgba(0, 86, 179, 0.3)',
    };

    const handleHover = (e, isHover) => {
        e.target.style.backgroundColor = isHover ? linkHoverStyle.backgroundColor : linkStyle.backgroundColor;
        e.target.style.boxShadow = isHover ? linkHoverStyle.boxShadow : linkStyle.boxShadow;
    };

    switch (link) {
        case '/login':
            return (
                <Link to={link} className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Login</Link>
            );
        case '/admin.html':
            return (
                <a href="admin.html" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Admin Page</a>
            );
        case '/admin_home.html':
            return (
                <a href="admin.html" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Admin Page</a>
            );
        default:
            return (
                <Link to="/" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go Back to Home</Link>
            );
    }
}


function NotFound({ message, link = null, status = 404 }) {
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

    // 默认 message 处理
    if (!message) {
        message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    }

    return (
        <div className={`notfound_container ${isDarkTheme ? 'dark' : 'light'}`}>
            <Components.EarthStar num={30} range={100} />
            <Components.Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="notfound_content">
                <h1 className="notfound_title">{status}</h1>
                <p className="notfound_subtitle">Oops! Page Not Found</p>
                <p className="notfound_message">
                    {message}
                </p>
                <div className='notfound_truckcar'>
                    <Components.TruckLoader />
                </div>
                <div className="notfound_link-container">
                    {classifyLink(link)} {/* 调用 classifyLink 函数 */}
                </div>
            </div>
        </div>
    );
}

export default validateUrl(NotFound);
