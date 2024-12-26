// import React, { useEffect, useRef } from 'react';
// import './style.css';

// const StarSky = () => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');

//         // 初始化变量
//         const STAR_COLOR = '#fff';
//         const STAR_SIZE = 3;
//         const STAR_MIN_SCALE = 0.2;
//         const OVERFLOW_THRESHOLD = 50;
//         const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

//         let scale = 1; // device pixel ratio
//         let width;
//         let height;
//         let stars = [];
//         let pointerX;
//         let pointerY;
//         let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
//         let touchInput = false;

//         // 生成星星
//         const generate = () => {
//             for (let i = 0; i < STAR_COUNT; i++) {
//                 stars.push({
//                     x: 0,
//                     y: 0,
//                     z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
//                 });
//             }
//         };

//         // 放置星星到随机位置
//         const placeStar = (star) => {
//             star.x = Math.random() * width;
//             star.y = Math.random() * height;
//         };

//         // 回收星星并重新放置
//         const recycleStar = (star) => {
//             let direction = 'z';
//             let vx = Math.abs(velocity.x);
//             let vy = Math.abs(velocity.y);

//             if (vx > 1 || vy > 1) {
//                 let axis = vx > vy ? 'h' : 'v';
//                 if (axis === 'h') {
//                     direction = velocity.x > 0 ? 'l' : 'r';
//                 } else {
//                     direction = velocity.y > 0 ? 't' : 'b';
//                 }
//             }

//             star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
//             if (direction === 'z') {
//                 star.z = 0.1;
//                 star.x = Math.random() * width;
//                 star.y = Math.random() * height;
//             } else if (direction === 'l') {
//                 star.x = -OVERFLOW_THRESHOLD;
//                 star.y = height * Math.random();
//             } else if (direction === 'r') {
//                 star.x = width + OVERFLOW_THRESHOLD;
//                 star.y = height * Math.random();
//             } else if (direction === 't') {
//                 star.x = width * Math.random();
//                 star.y = -OVERFLOW_THRESHOLD;
//             } else if (direction === 'b') {
//                 star.x = width * Math.random();
//                 star.y = height + OVERFLOW_THRESHOLD;
//             }
//         };

//         // 调整大小
//         const resize = () => {
//             scale = window.devicePixelRatio || 1;
//             width = window.innerWidth * scale;
//             height = window.innerHeight * scale;

//             canvas.width = width;
//             canvas.height = height;

//             stars.forEach(placeStar);
//         };

//         // 更新星星的位置和速度
//         const update = () => {
//             velocity.tx *= 0.96;
//             velocity.ty *= 0.96;

//             velocity.x += (velocity.tx - velocity.x) * 0.8;
//             velocity.y += (velocity.ty - velocity.y) * 0.8;

//             stars.forEach((star) => {
//                 star.x += velocity.x * star.z;
//                 star.y += velocity.y * star.z;

//                 star.x += (star.x - width / 2) * velocity.z * star.z;
//                 star.y += (star.y - height / 2) * velocity.z * star.z;
//                 star.z += velocity.z;

//                 if (
//                     star.x < -OVERFLOW_THRESHOLD ||
//                     star.x > width + OVERFLOW_THRESHOLD ||
//                     star.y < -OVERFLOW_THRESHOLD ||
//                     star.y > height + OVERFLOW_THRESHOLD
//                 ) {
//                     recycleStar(star);
//                 }
//             });
//         };

//         // 绘制星星
//         const render = () => {
//             context.clearRect(0, 0, width, height);

//             stars.forEach((star) => {
//                 context.beginPath();
//                 context.lineCap = 'round';
//                 context.lineWidth = STAR_SIZE * star.z * scale;
//                 context.globalAlpha = 0.5 + 0.5 * Math.random();
//                 context.strokeStyle = STAR_COLOR;

//                 context.moveTo(star.x, star.y);

//                 let tailX = velocity.x * 2;
//                 let tailY = velocity.y * 2;

//                 if (Math.abs(tailX) < 0.1) tailX = 0.5;
//                 if (Math.abs(tailY) < 0.1) tailY = 0.5;

//                 context.lineTo(star.x + tailX, star.y + tailY);
//                 context.stroke();
//             });
//         };

//         // 动画的每一帧
//         const step = () => {
//             update();
//             render();
//             requestAnimationFrame(step);
//         };

//         // 鼠标移动
//         const movePointer = (x, y) => {
//             if (typeof pointerX === 'number' && typeof pointerY === 'number') {
//                 let ox = x - pointerX;
//                 let oy = y - pointerY;

//                 velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
//                 velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
//             }

//             pointerX = x;
//             pointerY = y;
//         };

//         const onMouseMove = (event) => {
//             touchInput = false;
//             movePointer(event.clientX, event.clientY);
//         };

//         const onTouchMove = (event) => {
//             touchInput = true;
//             movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
//             event.preventDefault();
//         };

//         const onMouseLeave = () => {
//             pointerX = null;
//             pointerY = null;
//         };

//         // 初始化
//         generate();
//         resize();
//         step();

//         window.addEventListener('resize', resize);
//         canvas.addEventListener('mousemove', onMouseMove);
//         canvas.addEventListener('touchmove', onTouchMove);
//         canvas.addEventListener('mouseleave', onMouseLeave);

//         // 清理事件监听器
//         return () => {
//             window.removeEventListener('resize', resize);
//             canvas.removeEventListener('mousemove', onMouseMove);
//             canvas.removeEventListener('touchmove', onTouchMove);
//             canvas.removeEventListener('mouseleave', onMouseLeave);
//         };
//     }, []);

//     return (
//         <canvas ref={canvasRef} className='star-sky'/>
//     );
// };

// export default StarSky;


// import React, { useEffect, useRef } from 'react';
// import './style.css';

// const StarSky = () => {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');

//         // 初始化变量
//         const STAR_COLOR = '#fff';
//         const STAR_SIZE = 3;
//         const STAR_MIN_SCALE = 0.2;
//         const OVERFLOW_THRESHOLD = 50;
//         const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

//         let scale = 1; // device pixel ratio
//         let width;
//         let height;
//         let stars = [];
//         let pointerX = window.innerWidth / 2; // 初始化为屏幕中心
//         let pointerY = window.innerHeight / 2;
//         let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };

//         // 生成星星
//         const generate = () => {
//             for (let i = 0; i < STAR_COUNT; i++) {
//                 stars.push({
//                     x: 0,
//                     y: 0,
//                     z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
//                 });
//             }
//         };

//         // 放置星星到随机位置
//         const placeStar = (star) => {
//             star.x = Math.random() * width;
//             star.y = Math.random() * height;
//         };

//         // 回收星星并重新放置
//         const recycleStar = (star) => {
//             let direction = 'z';
//             let vx = Math.abs(velocity.x);
//             let vy = Math.abs(velocity.y);

//             if (vx > 1 || vy > 1) {
//                 let axis = vx > vy ? 'h' : 'v';
//                 if (axis === 'h') {
//                     direction = velocity.x > 0 ? 'l' : 'r';
//                 } else {
//                     direction = velocity.y > 0 ? 't' : 'b';
//                 }
//             }

//             star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
//             if (direction === 'z') {
//                 star.z = 0.1;
//                 star.x = Math.random() * width;
//                 star.y = Math.random() * height;
//             } else if (direction === 'l') {
//                 star.x = -OVERFLOW_THRESHOLD;
//                 star.y = height * Math.random();
//             } else if (direction === 'r') {
//                 star.x = width + OVERFLOW_THRESHOLD;
//                 star.y = height * Math.random();
//             } else if (direction === 't') {
//                 star.x = width * Math.random();
//                 star.y = -OVERFLOW_THRESHOLD;
//             } else if (direction === 'b') {
//                 star.x = width * Math.random();
//                 star.y = height + OVERFLOW_THRESHOLD;
//             }
//         };

//         // 调整大小
//         const resize = () => {
//             scale = window.devicePixelRatio || 1;
//             width = window.innerWidth * scale;
//             height = window.innerHeight * scale;

//             canvas.width = width;
//             canvas.height = height;

//             stars.forEach(placeStar);
//         };

//         // 更新星星的位置和速度
//         const update = () => {
//             velocity.tx *= 0.96;
//             velocity.ty *= 0.96;

//             velocity.x += (velocity.tx - velocity.x) * 0.8;
//             velocity.y += (velocity.ty - velocity.y) * 0.8;

//             stars.forEach((star) => {
//                 star.x += velocity.x * star.z;
//                 star.y += velocity.y * star.z;

//                 star.x += (star.x - width / 2) * velocity.z * star.z;
//                 star.y += (star.y - height / 2) * velocity.z * star.z;
//                 star.z += velocity.z;

//                 if (
//                     star.x < -OVERFLOW_THRESHOLD ||
//                     star.x > width + OVERFLOW_THRESHOLD ||
//                     star.y < -OVERFLOW_THRESHOLD ||
//                     star.y > height + OVERFLOW_THRESHOLD
//                 ) {
//                     recycleStar(star);
//                 }
//             });
//         };

//         // 绘制星星
//         const render = () => {
//             context.clearRect(0, 0, width, height);

//             stars.forEach((star) => {
//                 context.beginPath();
//                 context.lineCap = 'round';
//                 context.lineWidth = STAR_SIZE * star.z * scale;
//                 context.globalAlpha = 0.5 + 0.5 * Math.random();
//                 context.strokeStyle = STAR_COLOR;

//                 context.moveTo(star.x, star.y);

//                 let tailX = velocity.x * 2;
//                 let tailY = velocity.y * 2;

//                 if (Math.abs(tailX) < 0.1) tailX = 0.5;
//                 if (Math.abs(tailY) < 0.1) tailY = 0.5;

//                 context.lineTo(star.x + tailX, star.y + tailY);
//                 context.stroke();
//             });
//         };

//         // 动画的每一帧
//         const step = () => {
//             update();
//             render();
//             requestAnimationFrame(step);
//         };

//         // 鼠标移动
//         const movePointer = (x, y) => {
//             let ox = x - pointerX;
//             let oy = y - pointerY;

//             velocity.tx = velocity.tx + (ox / 8) * scale;
//             velocity.ty = velocity.ty + (oy / 8) * scale;

//             pointerX = x;
//             pointerY = y;
//         };

//         const onMouseMove = (event) => {
//             movePointer(event.clientX, event.clientY);
//         };

//         // 初始化
//         generate();
//         resize();
//         step();

//         window.addEventListener('resize', resize);
//         window.addEventListener('mousemove', onMouseMove);

//         // 清理事件监听器
//         return () => {
//             window.removeEventListener('resize', resize);
//             window.removeEventListener('mousemove', onMouseMove);
//         };
//     }, []);

//     return (
//         <canvas ref={canvasRef} className='star-sky'/>
//     );
// };

// export default StarSky;

import React, { useEffect, useRef } from 'react';
import './style.css';

const StarSky = ({ starCount = 100, speed = 0.0009, mouseSpeed = 0.1, isDarkTheme = false, isfollow = true }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!isDarkTheme) {
            //清空画布
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // 初始化变量
        const STAR_COLOR = '#fff';
        const STAR_SIZE = 3;
        const STAR_MIN_SCALE = 0.2;
        const OVERFLOW_THRESHOLD = 50;

        let scale = 1; // device pixel ratio
        let width;
        let height;
        let stars = [];
        let pointerX = window.innerWidth / 2; // 初始化为屏幕中心
        let pointerY = window.innerHeight / 2;
        let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: speed }; // 速度由 `props` 提供

        // 生成星星
        const generate = () => {
            for (let i = 0; i < starCount; i++) { // 使用 props 控制星星数量
                stars.push({
                    x: 0,
                    y: 0,
                    z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
                });
            }
        };

        // 放置星星到随机位置
        const placeStar = (star) => {
            star.x = Math.random() * width;
            star.y = Math.random() * height;
        };

        // 回收星星并重新放置
        const recycleStar = (star) => {
            let direction = 'z';
            let vx = Math.abs(velocity.x);
            let vy = Math.abs(velocity.y);

            if (vx > 1 || vy > 1) {
                let axis = vx > vy ? 'h' : 'v';
                if (axis === 'h') {
                    direction = velocity.x > 0 ? 'l' : 'r';
                } else {
                    direction = velocity.y > 0 ? 't' : 'b';
                }
            }

            star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
            if (direction === 'z') {
                star.z = 0.1;
                star.x = Math.random() * width;
                star.y = Math.random() * height;
            } else if (direction === 'l') {
                star.x = -OVERFLOW_THRESHOLD;
                star.y = height * Math.random();
            } else if (direction === 'r') {
                star.x = width + OVERFLOW_THRESHOLD;
                star.y = height * Math.random();
            } else if (direction === 't') {
                star.x = width * Math.random();
                star.y = -OVERFLOW_THRESHOLD;
            } else if (direction === 'b') {
                star.x = width * Math.random();
                star.y = height + OVERFLOW_THRESHOLD;
            }
        };

        // 调整大小
        const resize = () => {
            scale = window.devicePixelRatio || 1;
            width = window.innerWidth * scale;
            height = window.innerHeight * scale;

            canvas.width = width;
            canvas.height = height;

            stars.forEach(placeStar);
        };

        // 更新星星的位置和速度
        const update = () => {
            velocity.tx *= 0.96;
            velocity.ty *= 0.96;

            velocity.x += (velocity.tx - velocity.x) * 0.8;
            velocity.y += (velocity.ty - velocity.y) * 0.8;

            stars.forEach((star) => {
                star.x += velocity.x * star.z;
                star.y += velocity.y * star.z;

                star.x += (star.x - width / 2) * velocity.z * star.z;
                star.y += (star.y - height / 2) * velocity.z * star.z;
                star.z += velocity.z;

                if (
                    star.x < -OVERFLOW_THRESHOLD ||
                    star.x > width + OVERFLOW_THRESHOLD ||
                    star.y < -OVERFLOW_THRESHOLD ||
                    star.y > height + OVERFLOW_THRESHOLD
                ) {
                    recycleStar(star);
                }
            });
        };

        // 绘制星星
        const render = () => {
            context.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                context.beginPath();
                context.lineCap = 'round';
                context.lineWidth = STAR_SIZE * star.z * scale;
                context.globalAlpha = 0.5 + 0.5 * Math.random();
                context.strokeStyle = STAR_COLOR;

                context.moveTo(star.x, star.y);

                let tailX = velocity.x * 2;
                let tailY = velocity.y * 2;

                if (Math.abs(tailX) < 0.1) tailX = 0.5;
                if (Math.abs(tailY) < 0.1) tailY = 0.5;

                context.lineTo(star.x + tailX, star.y + tailY);
                context.stroke();
            });
        };

        // 动画的每一帧
        const step = () => {
            update();
            render();
            animationRef.current = requestAnimationFrame(step);
        };

        // 鼠标移动
        const movePointer = (x, y) => {
            let ox = x - pointerX;
            let oy = y - pointerY;

            // 使用 `mouseSpeed` 调整鼠标跟随灵敏度
            velocity.tx = velocity.tx + (ox / 8) * scale * mouseSpeed;
            velocity.ty = velocity.ty + (oy / 8) * scale * mouseSpeed;

            pointerX = x;
            pointerY = y;
        };

        const onMouseMove = (event) => {
            if (!isfollow) return;
            movePointer(event.clientX, event.clientY);
        };

        // 初始化
        generate();
        resize();
        step();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);

        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationRef.current); // 停止动画
        };
    }, [starCount, speed, mouseSpeed, isDarkTheme, isfollow]); // 当 `isDarkTheme` 或其他参数变化时重新初始化

    return <canvas ref={canvasRef} className="star-sky" />;
};


export default StarSky;
