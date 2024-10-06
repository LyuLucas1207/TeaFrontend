import '../../css/App.css';
import { validateUrl } from '../utility/validate';
import { useValidRoute } from '../utility/myUse';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom'; // 引入 Link 组件
import Switch from '../components/Switch';
import { useTheme } from '../utility/myUse';
import Firework from '../components/Firework';

import {
    AnimationEffectLight,
    AnimationSpin,
    AnimationNineSquares,
    AnimationWaves,
    AnimationCube,
    AnimationHeart,
    AnimationFiveSquares,
    AnimationRaining,
    AnimationCubeShadow,
    AnimationBook,
    AnimationEarth,
    AnimationSaturnSpin,
    AnimationRibbonSpin,
} from '../components/AnimationComponents';
function App() {
    const validPaths = ['/', '/not-found', '/index'];
    useValidRoute(validPaths);
    const [isDarkTheme, toggleTheme] = useTheme();

    return (
        <>
           


            <div className="app_outer-container">
                <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
                <div className="app_inner-container">
                    <div className="app_content">
                        <h1>Welcome to ProJectHub</h1>
                        <p>
                        </p>
                    </div>

                    <main className="app_spline-container">
                        <Spline
                            scene="https://prod.spline.design/o-ljJpLLOhYyoPOF/scene.splinecode"
                        />
                    </main>
                    

                    <div className="app_fix-cover">
                        <span className="app_color-overlay">
                            <Link to="/contact">
                                Join Us
                            </Link>
                        </span>
                    </div>
                </div>



                

                <Firework width="90vw" height="90vh" />

                <AnimationSpin />

                <AnimationEffectLight />

                <AnimationNineSquares />

                <AnimationWaves />

                <AnimationCube />

                <AnimationHeart />

                <AnimationFiveSquares />

                <AnimationRaining />

                <AnimationCubeShadow />

                <AnimationBook />

                <AnimationEarth />

                <AnimationSaturnSpin />

                <AnimationRibbonSpin />

            </div>
        </>
    );
}

export default validateUrl(App);
