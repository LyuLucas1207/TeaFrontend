import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Firework, resizeCanvas, generateFirework, Star, generateStar } from './generateAnimation';

function useValidRoute(validPaths, url = '/not-found') {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        if (!validPaths.includes(path)) {
            // 如果当前路径不在有效路径列表中，重定向到 NotFound 页面
            navigate(url, { replace: true });
            window.location.herf = url;
            window.location.replace(url);
        }
    }, [location, navigate, validPaths, url]);
}

function useTheme (){
    // 从 localStorage 获取主题（防止刷新丢失）
    const savedTheme = localStorage.getItem('theme') === 'dark';
    const [isDarkTheme, setIsDarkTheme] = useState(savedTheme);

    // 切换主题函数
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light'); // 保存主题到 localStorage
            return newTheme;
        });
    };

    // 监听主题变化，动态修改 body 类
    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    return [isDarkTheme, toggleTheme];
};

function useStarEffect(selector, starCount, animationDuration) {
    useEffect(() => {
        const starInstance = new Star(selector, starCount, animationDuration); // 创建 Star 实例
        generateStar(starInstance); // 调用 generateStar 生成星星效果
    }, [selector, starCount, animationDuration]); // 当这三个参数变化时重新生成效果
}

// 自定义 Hook，用于处理烟花效果
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

export { useTheme , useValidRoute, useStarEffect, useFireworkEffect };