// // StarPlanet.js
// import React, { useEffect, useRef } from 'react';
// import PointCloudAnimation from './PointCloudAnimation';
// import './style.css';

// const StarPlanet = ({
//     radiusFactor = 0.25, // 球体大小比例
//     radiusFactorRing = 0.5, // 环大小比例
//     numSpherePoints = 1500, // 球体点数量
//     numRingPoints = 10000, // 环点数量（根据需求增加）
//     pointSize = 1.5, // 点大小
//     rotationSpeedSphere = 0.0005, // 球体旋转速度
//     rotationSpeedRing = 0.0003, // 环旋转速度（比球体慢）
//     backgroundColor = 'rgba(0, 0, 0, 0)', // 透明背景颜色
//     spherePointColor = '255, 255, 255', // 球体点的RGB颜色
//     ringPointColor = '255, 215, 0', // 环点的RGB颜色，例如金色
//     viewAngleX = -10, // 视角旋转X轴角度（度）
//     viewAngleY = -100, // 视角旋转Y轴角度（度）
//     minScale = 0.6, // 最小缩放比例
//     maxScale = 5, // 最大缩放比例
//     zoomStep = 0.1, // 缩放步长
//     blinkFrequency = 1, // 闪烁频率（Hz）
//     isDarkTheme = false, // 是否为暗色模式
// }) => {
//     const containerRef = useRef(null);
//     const pointCloudRef = useRef(null);

//     useEffect(() => {
//         if (containerRef.current && !pointCloudRef.current) {
//             // Initialize PointCloudAnimation with all necessary parameters
//             pointCloudRef.current = new PointCloudAnimation(containerRef.current, {
//                 radiusFactor,
//                 radiusFactorRing,
//                 numSpherePoints,
//                 numRingPoints,
//                 pointSize,
//                 rotationSpeedSphere,
//                 rotationSpeedRing,
//                 backgroundColor,
//                 spherePointColor,
//                 ringPointColor,
//                 viewAngleX,
//                 viewAngleY,
//                 minScale,
//                 maxScale,
//                 zoomStep,
//                 blinkFrequency,
//             });
//         }

//         // Control animation based on isDarkTheme
//         if (pointCloudRef.current) {
//             if (isDarkTheme) {
//                 pointCloudRef.current.resume();
//                 // Ensure the canvas is visible
//                 pointCloudRef.current.canvas.style.display = 'block';
//             } else {
//                 pointCloudRef.current.pause();
//                 // Optionally hide the canvas to save rendering
//                 pointCloudRef.current.canvas.style.display = 'none';
//             }
//         }

//         // Cleanup on unmount
//         return () => {
//             if (pointCloudRef.current) {
//                 pointCloudRef.current.destroy();
//                 pointCloudRef.current = null;
//             }
//         };
//     }, [
//         radiusFactor,
//         radiusFactorRing,
//         numSpherePoints,
//         numRingPoints,
//         pointSize,
//         rotationSpeedSphere,
//         rotationSpeedRing,
//         backgroundColor,
//         spherePointColor,
//         ringPointColor,
//         viewAngleX,
//         viewAngleY,
//         minScale,
//         maxScale,
//         zoomStep,
//         blinkFrequency,
//         isDarkTheme,
//     ]);

//     return <div ref={containerRef} className='animation-container'></div>;
// };

// export default StarPlanet;

// StarPlanet.js
import React, { useEffect } from 'react';
import PointCloudAnimation from './PointCloudAnimation';
import './style.css';

const StarPlanet = ({
    radiusFactor = 0.25, // 球体大小比例
    radiusFactorRing = 0.5, // 环大小比例
    numSpherePoints = 1500, // 球体点数量
    numRingPoints = 10000, // 环点数量（根据需求增加）
    pointSize = 1.5, // 点大小
    rotationSpeedSphere = 0.0005, // 球体旋转速度
    rotationSpeedRing = 0.0003, // 环旋转速度（比球体慢）
    backgroundColor = 'rgba(0, 0, 0, 0)', // 透明背景颜色
    spherePointColor = '255, 255, 255', // 球体点的RGB颜色
    ringPointColor = '255, 215, 0', // 环点的RGB颜色，例如金色
    viewAngleX = -10, // 视角旋转X轴角度（度）
    viewAngleY = -100, // 视角旋转Y轴角度（度）
    minScale = 0.6, // 最小缩放比例
    maxScale = 5, // 最大缩放比例
    zoomStep = 0.05, // 缩放步长
    blinkFrequency = 1, // 闪烁频率（Hz）
    isDarkTheme = false, // 是否为暗色模式
}) => {
    useEffect(() => {
        let pointCloud = null;

        if (isDarkTheme) {
            // 获取容器元素
            const container = document.getElementById('point-cloud-container');
            if (container) {
                // 创建 PointCloudAnimation 实例
                pointCloud = new PointCloudAnimation(container, {
                    radiusFactor,
                    radiusFactorRing,
                    numSpherePoints,
                    numRingPoints,
                    pointSize,
                    rotationSpeedSphere,
                    rotationSpeedRing,
                    backgroundColor,
                    spherePointColor,
                    ringPointColor,
                    viewAngleX,
                    viewAngleY,
                    minScale,
                    maxScale,
                    zoomStep,
                    blinkFrequency,
                });

                // 初始化动画（创建 canvas，设置事件监听器，启动动画循环）
                pointCloud.initialize();
            }
        } 
        // 清理函数：销毁 PointCloudAnimation 实例
        return () => {
            if (pointCloud) {
                pointCloud.destroy();
            }
        };
    }, [
        radiusFactor,
        radiusFactorRing,
        numSpherePoints,
        numRingPoints,
        pointSize,
        rotationSpeedSphere,
        rotationSpeedRing,
        backgroundColor,
        spherePointColor,
        ringPointColor,
        viewAngleX,
        viewAngleY,
        minScale,
        maxScale,
        zoomStep,
        blinkFrequency,
        isDarkTheme,
    ]);

    return <div id='point-cloud-container' className='animation-container'></div>;
};

export default StarPlanet;
