import { useStarEffect } from '../utility/myUse';
import '../../css/components/EarthStar.css';

function EarthStar({ num=30, range=100 }) { // 解构 props
    useStarEffect('.earth-star-ES', num, range); // 正确使用 props 中的 num 和 range

    return (
        <div className="earth-star-ES"></div> // 修正 className
    );
}

// How to use: <EarthStar num={30} range={100} />

export default EarthStar;
