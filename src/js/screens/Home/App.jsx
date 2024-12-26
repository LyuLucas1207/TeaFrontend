import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { validateUrl } from '../../utils/helpers/validate';
import { useValidRoute, useTheme } from '../../utils/helpers/myUse';

import Components from '../../components/components';

import Home from './Home';

function App() {
    const validPaths = ['/', '/not-found', '/index', '/index/products', '/index/about', '/index/history', '/index/contact'];
    useValidRoute(validPaths);
    const [isDarkTheme, toggleTheme] = useTheme(false);
    const location = useLocation();

    // 仅当路径为 "/index" 时显示 Home
    const showHome = location.pathname === '/index';

    return (
        <>
            <Components.StarSky starCount={66} speed={0.0009} mouseSpeed={0.1} isDarkTheme={isDarkTheme} />
            <div className="app_outer-container">
                <Components.Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} /> {/* 保留 Switch 组件 */}
                <Components.Navigation isDarkTheme={isDarkTheme} />
                <div className="app_inner-container">
                    {/* Inner Change */}
                    {showHome && <Home isDarkTheme={isDarkTheme} />}
                    <Outlet />
                    <Components.Bottom isDarkTheme={isDarkTheme} />
                </div>
            </div>
        </>
    );
}

export default validateUrl(App);



// import Firework from '../components/Firework';
// import Spline from '@splinetool/react-spline';

// import {
//     AnimationEffectLight,
//     AnimationSpin,
//     AnimationNineSquares,
//     AnimationWaves,
//     AnimationCube,
//     AnimationHeart,
//     AnimationFiveSquares,
//     AnimationRaining,
//     AnimationCubeShadow,
//     AnimationBook,
//     AnimationEarth,
//     AnimationSaturnSpin,
//     AnimationRibbonSpin,
// } from '../components/AnimationComponents';


// <div className="app_inner-container">
//     <div className="app_content">
//         <h1>Welcome to ProJectHub</h1>
//         <p>
//         </p>
//     </div>
//     <main className="app_spline-container">
//         <Spline
//             scene="https://prod.spline.design/o-ljJpLLOhYyoPOF/scene.splinecode"
//         />
//     </main>
    
//     <div className="app_fix-cover">
//         <span className="app_color-overlay">
//             <Link to="/contact">
//                 Join Us
//             </Link>
//         </span>
//     </div>
// </div>
// <Firework width="90vw" height="90vh" />
