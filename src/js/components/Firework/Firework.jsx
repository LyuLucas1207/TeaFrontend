import React, { useRef, useEffect } from 'react';
import { Firework, resizeCanvas, generateFirework } from './FireworkPartice';

function Fireworks({ width = '100vw', height = '100vh' }) { // 解构 props
    const canvasReff = useRef(null); // 获取 canvas 引用

    function useFireworkEffect (canvasRef) {
        useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
    
            // 初始化 canvas 尺寸
            resizeCanvas(canvas);
    
            // 监听窗口大小变化
            window.addEventListener('resize', () => resizeCanvas(canvas), false);
    
            // 初始化烟花和粒子数组
            const fireworks = [new Firework(canvas)];
            const particles = [];
    
            // 开始动画
            generateFirework(ctx, canvas, fireworks, particles);
    
            // 在组件卸载时移除窗口大小变化的监听器
            return () => {
                window.removeEventListener('resize', () => resizeCanvas(canvas));
            };
        }, [canvasRef]);
    };

    // 调用自定义 Hook，实现烟花效果
    useFireworkEffect(canvasReff);

    return (
        <canvas
            ref={canvasReff}
            style={{ display: 'block', background: 'black', width: width, height: height }}
        />
    );
};

//How to use :   <Firework width="100vw" height="100vh" />

export default Fireworks;
