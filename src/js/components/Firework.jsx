import React, { useRef } from 'react';
import { useFireworkEffect } from '../utility/myUse';

function Firework({ width = '100vw', height = '100vh' }) { // 解构 props
    const canvasRef = useRef(null); // 获取 canvas 引用

    // 调用自定义 Hook，实现烟花效果
    useFireworkEffect(canvasRef);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', background: 'black', width: width, height: height }}
        />
    );
};

//How to use :   <Firework width="100vw" height="100vh" />

export default Firework;
