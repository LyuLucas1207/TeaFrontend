import React, { useEffect } from 'react'; // 引入 useEffect
import Star from './Star'; // 引入 Star
import './style.css';

function EarthStar({ num=30, range=100 }) { // 解构 props

    function useStarEffect(selector, starCount, animationDuration) {
        useEffect(() => {
            const starInstance = new Star(selector, starCount, animationDuration); // 创建 Star 实例
            starInstance.generateStar(); // 调用 generateStar 生成星星效果
        }, [selector, starCount, animationDuration]); // 当这三个参数变化时重新生成效果
    }

    useStarEffect('.earth-star-ES', num, range); // 正确使用 props 中的 num 和 range

    return (
        <div className="earth-star-ES"></div> // 修正 className
    );
}

// How to use: <EarthStar num={30} range={100} />

export default EarthStar;
