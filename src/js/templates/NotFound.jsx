// 引入组件
import React from 'react';
import TruckLoader from '../components/TruckLoader';
import Switch from '../components/Switch';

// 引入样式文件
import '../../css/NotFound.css';

// 引入自定义 Hook 和工具函数
import { useTheme } from '../utility/myUse';
import { validateUrl } from '../utility/validate';
import { classifyLink } from '../utility/classifyInformation';
import EarthStar from '../components/EarthStar';


function NotFound({ message, link = null, status = 404 }) {
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook

    // 默认 message 处理
    if (!message) {
        message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.';
    }

    return (
        <div className={`notfound_container ${isDarkTheme ? 'dark' : 'light'}`}>
            <EarthStar num={30} range={100} />
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="notfound_content">
                <h1 className="notfound_title">{status}</h1>
                <p className="notfound_subtitle">Oops! Page Not Found</p>
                <p className="notfound_message">
                    {message}
                </p>
                <div className='notfound_truckcar'>
                    <TruckLoader />
                </div>
                <div className="notfound_link-container">
                    {classifyLink(link)} {/* 调用 classifyLink 函数 */}
                </div>
            </div>
        </div>
    );
}

export default validateUrl(NotFound);
