// // PointCloudAnimation.js
// class PointCloudAnimation {
//     constructor(container, options = {}) {
//         const {
//             radiusFactor = 0.25, // 球体大小比例
//             radiusFactorRing = 0.5, // 环大小比例
//             numSpherePoints = 1500, // 球体点数量
//             numRingPoints = 10000, // 环点数量（根据需求增加）
//             pointSize = 1.5, // 点大小
//             rotationSpeedSphere = 0.0005, // 球体旋转速度
//             rotationSpeedRing = 0.0003, // 环旋转速度（比球体慢）
//             backgroundColor = 'rgba(0, 0, 0, 0)', // 透明背景颜色
//             spherePointColor = '255, 255, 255', // 球体点的RGB颜色
//             ringPointColor = '255, 215, 0', // 环点的RGB颜色，例如金色
//             viewAngleX = -10, // 视角旋转X轴角度（度）
//             viewAngleY = -100, // 视角旋转Y轴角度（度）
//             minScale = 0.6, // 最小缩放比例
//             maxScale = 5, // 最大缩放比例
//             zoomStep = 0.1, // 缩放步长
//             blinkFrequency = 1, // 闪烁频率（Hz）
//         } = options;

//         // Assign parameters to the instance
//         this.container = container;
//         this.radiusFactor = radiusFactor;
//         this.radiusFactorRing = radiusFactorRing;
//         this.numSpherePoints = numSpherePoints;
//         this.numRingPoints = numRingPoints;
//         this.pointSize = pointSize;
//         this.rotationSpeedSphere = rotationSpeedSphere;
//         this.rotationSpeedRing = rotationSpeedRing;
//         this.backgroundColor = backgroundColor;
//         this.spherePointColor = spherePointColor;
//         this.ringPointColor = ringPointColor;
//         this.viewAngleX = viewAngleX;
//         this.viewAngleY = viewAngleY;
//         this.minScale = minScale;
//         this.maxScale = maxScale;
//         this.zoomStep = zoomStep;
//         this.blinkFrequency = blinkFrequency;

//         this.scale = 1;
//         this.isAnimating = true; // Control flag for animation loop

//         // Create and configure the canvas
//         this.canvas = document.createElement('canvas');
//         this.canvas.style.background = this.backgroundColor;
//         this.container.appendChild(this.canvas);
//         this.ctx = this.canvas.getContext('2d');

//         // Bind methods
//         this.resizeCanvas = this.resizeCanvas.bind(this);
//         this.handleWheel = this.handleWheel.bind(this);
//         this.handleMouseDown = this.handleMouseDown.bind(this);
//         this.handleMouseMove = this.handleMouseMove.bind(this);
//         this.handleMouseUp = this.handleMouseUp.bind(this);
//         this.animate = this.animate.bind(this);

//         // Event listeners
//         window.addEventListener('resize', this.resizeCanvas);
//         window.addEventListener('wheel', this.handleWheel, { passive: true });
//         window.addEventListener('mousedown', this.handleMouseDown);
//         window.addEventListener('mousemove', this.handleMouseMove);
//         window.addEventListener('mouseup', this.handleMouseUp);

//         // Initialize
//         this.resizeCanvas();
//         this.initSpherePoints();
//         this.initRingPoints();
//         this.angleSphere = 0;
//         this.angleRing = 0;
//         this.viewRotation = this.calculateViewRotation(this.viewAngleX, this.viewAngleY);

//         this.isDragging = false;
//         this.lastMouseX = 0;
//         this.lastMouseY = 0;

//         this.startTime = null;

//         // Start animation
//         requestAnimationFrame(this.animate);
//     }

//     resizeCanvas() {
//         this.canvas.width = this.container.clientWidth;
//         this.canvas.height = this.container.clientHeight;
//         this.radius = Math.min(this.canvas.width, this.canvas.height) * this.radiusFactor;
//         this.radiusRing = Math.min(this.canvas.width, this.canvas.height) * this.radiusFactorRing;
//         this.baseViewerDistance = this.radius * 3;
//         this.viewerDistance = this.baseViewerDistance * this.scale;
//     }

//     initSpherePoints() {
//         this.spherePoints = [];
//         for (let i = 0; i < this.numSpherePoints; i++) {
//             const theta = Math.acos(2 * Math.random() - 1);
//             const phi = 2 * Math.PI * Math.random();
//             const x = this.radius * Math.sin(theta) * Math.cos(phi);
//             const y = this.radius * Math.sin(theta) * Math.sin(phi);
//             const z = this.radius * Math.cos(theta);
//             const phase = Math.random() * 2 * Math.PI;
//             this.spherePoints.push({ x, y, z, phase });
//         }
//     }

//     initRingPoints() {
//         this.ringPoints = [];
//         const innerRadius = this.radiusRing * 0.6;
//         const outerRadius = this.radiusRing * 2.0;

//         for (let i = 0; i < this.numRingPoints; i++) {
//             const theta = 2 * Math.PI * Math.random();
//             const r = innerRadius + Math.random() * (outerRadius - innerRadius);
//             const x = r * Math.cos(theta);
//             const z = r * Math.sin(theta);
//             const y = (Math.random() - 0.5) * this.radius * 0.2;
//             const phase = Math.random() * 2 * Math.PI;
//             this.ringPoints.push({ x, y, z, phase });
//         }
//     }

//     calculateViewRotation(angleX, angleY) {
//         const radX = angleX * Math.PI / 180;
//         const radY = angleY * Math.PI / 180;
//         const cosX = Math.cos(radX);
//         const sinX = Math.sin(radX);
//         const cosY = Math.cos(radY);
//         const sinY = Math.sin(radY);
//         return { cosX, sinX, cosY, sinY };
//     }

//     applyViewRotation(point) {
//         let y = point.y * this.viewRotation.cosX - point.z * this.viewRotation.sinX;
//         let z = point.y * this.viewRotation.sinX + point.z * this.viewRotation.cosX;
//         let x = point.x * this.viewRotation.cosY + z * this.viewRotation.sinY;
//         z = -point.x * this.viewRotation.sinY + z * this.viewRotation.cosY;
//         return { x, y, z };
//     }

//     handleWheel(event) {
//         const delta = event.deltaY;
//         if (delta > 0) {
//             this.scale = Math.min(this.scale + this.zoomStep, this.maxScale);
//         } else {
//             this.scale = Math.max(this.scale - this.zoomStep, this.minScale);
//         }
//         this.viewerDistance = this.baseViewerDistance * this.scale;
//     }

//     handleMouseDown(event) {
//         this.isDragging = true;
//         this.lastMouseX = event.clientX;
//         this.lastMouseY = event.clientY;
//         event.preventDefault();
//     }

//     handleMouseMove(event) {
//         if (this.isDragging) {
//             const deltaX = event.clientX - this.lastMouseX;
//             const deltaY = event.clientY - this.lastMouseY;
//             this.lastMouseX = event.clientX;
//             this.lastMouseY = event.clientY;

//             const sensitivity = 0.1;
//             this.viewAngleY += deltaX * sensitivity;
//             this.viewAngleX += deltaY * sensitivity;

//             this.viewAngleX = Math.max(-90, Math.min(90, this.viewAngleX));

//             this.viewRotation = this.calculateViewRotation(this.viewAngleX, this.viewAngleY);
//         }
//     }

//     handleMouseUp() {
//         this.isDragging = false;
//     }

//     animate(timestamp) {
//         if (!this.startTime) this.startTime = timestamp;
//         const elapsedTime = (timestamp - this.startTime) / 1000;

//         if (!this.isAnimating) {
//             // Skip rendering if animation is paused
//             requestAnimationFrame(this.animate);
//             return;
//         }

//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//         const centerX = this.canvas.width / 2;
//         const centerY = this.canvas.height / 2;

//         const cosAS = Math.cos(this.angleSphere);
//         const sinAS = Math.sin(this.angleSphere);

//         const cosAR = Math.cos(this.angleRing);
//         const sinAR = Math.sin(this.angleRing);

//         // Draw Sphere Points
//         this.spherePoints.forEach(point => {
//             let x = point.x * this.scale;
//             let y = point.y * this.scale;
//             let z = point.z * this.scale;

//             // Rotate around Y-axis for sphere
//             const rotatedX = x * cosAS - z * sinAS;
//             const rotatedZ = x * sinAS + z * cosAS;
//             const rotatedY = y;

//             // Apply view rotation
//             const viewRotated = this.applyViewRotation({ x: rotatedX, y: rotatedY, z: rotatedZ });
//             const finalX = viewRotated.x;
//             const finalY = viewRotated.y;
//             const finalZ = viewRotated.z;

//             // Perspective Projection
//             const scaleProj = this.viewerDistance / (this.viewerDistance + finalZ);
//             const projX = finalX * scaleProj + centerX;
//             const projY = finalY * scaleProj + centerY;

//             // Blink Effect
//             const alpha = (Math.sin(2 * Math.PI * this.blinkFrequency * elapsedTime + point.phase) + 1) / 2;

//             this.ctx.fillStyle = `rgba(${this.spherePointColor}, ${alpha * scaleProj})`;
//             this.ctx.beginPath();
//             this.ctx.arc(projX, projY, this.pointSize, 0, 2 * Math.PI);
//             this.ctx.fill();
//         });

//         // Draw Ring Points
//         this.ringPoints.forEach(point => {
//             let x = point.x * this.scale;
//             let y = point.y * this.scale;
//             let z = point.z * this.scale;

//             // Rotate around Y-axis for ring
//             const rotatedX = x * cosAR - z * sinAR;
//             const rotatedZ = x * sinAR + z * cosAR;
//             const rotatedY = y;

//             // Apply view rotation
//             const viewRotated = this.applyViewRotation({ x: rotatedX, y: rotatedY, z: rotatedZ });
//             const finalX = viewRotated.x;
//             const finalY = viewRotated.y;
//             const finalZ = viewRotated.z;

//             // Perspective Projection
//             const scaleProj = this.viewerDistance / (this.viewerDistance + finalZ);
//             const projX = finalX * scaleProj + centerX;
//             const projY = finalY * scaleProj + centerY;

//             // Blink Effect
//             const alpha = (Math.sin(2 * Math.PI * this.blinkFrequency * elapsedTime + point.phase) + 1) / 2;

//             this.ctx.fillStyle = `rgba(${this.ringPointColor}, ${alpha * scaleProj})`;
//             this.ctx.beginPath();
//             this.ctx.arc(projX, projY, this.pointSize, 0, 2 * Math.PI);
//             this.ctx.fill();
//         });

//         // Update rotation angles
//         this.angleSphere += this.rotationSpeedSphere;
//         this.angleRing += this.rotationSpeedRing;

//         requestAnimationFrame(this.animate);
//     }

//     pause() {
//         this.isAnimating = false;
//     }

//     resume() {
//         if (!this.isAnimating) {
//             this.isAnimating = true;
//             // Reset startTime to prevent jump in elapsedTime
//             this.startTime = null;
//             requestAnimationFrame(this.animate);
//         }
//     }

//     destroy() {
//         // Remove event listeners
//         window.removeEventListener('resize', this.resizeCanvas);
//         window.removeEventListener('wheel', this.handleWheel);
//         window.removeEventListener('mousedown', this.handleMouseDown);
//         window.removeEventListener('mousemove', this.handleMouseMove);
//         window.removeEventListener('mouseup', this.handleMouseUp);

//         // Remove canvas
//         if (this.canvas && this.container.contains(this.canvas)) {
//             this.container.removeChild(this.canvas);
//         }
//     }
// }

// export default PointCloudAnimation;
// PointCloudAnimation.js
import { debounce } from '../../utils/helpers/standards.js';

class PointCloudAnimation {
    constructor(container, options = {}) {
        const {
            radiusFactor = 0.25, // 球体大小比例
            radiusFactorRing = 0.5, // 环大小比例
            thicknessCircle = 0.05, // 球体厚度比例（0.1 表示 ±10%）
            thicknessCircleRing = 0.1, // 环厚度比例（0.1 表示 ±10%）
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
            zoomStep = 0.1, // 缩放步长
            blinkFrequency = 1, // 闪烁频率（Hz）
        } = options;

        // Assign parameters to the instance
        this.container = container;
        this.radiusFactor = radiusFactor;
        this.radiusFactorRing = radiusFactorRing;
        this.thicknessCircle = thicknessCircle;
        this.thicknessCircleRing = thicknessCircleRing;
        this.numSpherePoints = numSpherePoints;
        this.numRingPoints = numRingPoints;
        this.pointSize = pointSize;
        this.rotationSpeedSphere = rotationSpeedSphere;
        this.rotationSpeedRing = rotationSpeedRing;
        this.backgroundColor = backgroundColor;
        this.spherePointColor = spherePointColor;
        this.ringPointColor = ringPointColor;
        this.viewAngleX = viewAngleX;
        this.viewAngleY = viewAngleY;
        this.minScale = minScale;
        this.maxScale = maxScale;
        this.zoomStep = zoomStep;
        this.blinkFrequency = blinkFrequency;

        this.scale = 0.4; // Initial scale
        this.isAnimating = true; // Control flag for animation loop

        // Initialize internal state variables
        this.angleSphere = 0;
        this.angleRing = 0;
        this.viewRotation = this.calculateViewRotation(this.viewAngleX, this.viewAngleY);

        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.startTime = null;

        // Initialize points arrays
        this.spherePoints = [];
        this.ringPoints = [];
    }

    /**
     * Initializes the canvas, event listeners, and starts the animation.
     */
    initialize() {
        // Create and configure the canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.background = this.backgroundColor;
        this.canvas.style.position = 'absolute'; // 绝对定位
        this.canvas.style.top = '50%';
        this.canvas.style.left = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)'; // 居中

        // 设置 canvas 的尺寸超过容器（允许溢出）
        this.canvas.width = this.container.clientWidth * 1.5; // 根据需要调整比例
        this.canvas.height = this.container.clientHeight * 1.5; // 根据需要调整比例

        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        // Bind methods to ensure correct 'this' context
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.animate = this.animate.bind(this);

        // Set up event listeners
        window.addEventListener('wheel', this.handleWheel, { passive: true });
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        // Set up debounced resize event to prevent excessive reloading
        window.addEventListener('resize', debounce(() => {
            window.location.reload();
        }, 200));

        // Initialize canvas size and point data
        this.resizeCanvas();
        this.initSpherePoints();
        this.initRingPoints();

        // Start the animation loop
        requestAnimationFrame(this.animate);
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.container.clientWidth * 1.5; // 根据需要调整比例
        this.canvas.height = this.container.clientHeight * 1.5; // 根据需要调整比例
        this.radius = Math.min(this.canvas.width, this.canvas.height) * this.radiusFactor;
        this.radiusRing = Math.min(this.canvas.width, this.canvas.height) * this.radiusFactorRing;
        this.baseViewerDistance = this.radius * 3;
        this.viewerDistance = this.baseViewerDistance * this.scale;

        // 如果需要，可以重新初始化点云数据或调整绘制逻辑
    }

    initSpherePoints() {
        this.spherePoints = [];
        for (let i = 0; i < this.numSpherePoints; i++) {
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = 2 * Math.PI * Math.random();
            // 生成一个随机半径，使得点分布在球壳内
            const r = this.radius * (1 + (Math.random() - 0.5) * 2 * this.thicknessCircle);
            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);
            const phase = Math.random() * 2 * Math.PI;
            this.spherePoints.push({ x, y, z, phase });
        }
    }

    initRingPoints() {
        this.ringPoints = [];
        const innerRadius = this.radiusRing * 0.6;
        const outerRadius = this.radiusRing * 2.0;
        const yThickness = this.radius * this.thicknessCircleRing; // 环的垂直厚度

        for (let i = 0; i < this.numRingPoints; i++) {
            const theta = 2 * Math.PI * Math.random();
            const r = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);
            // 生成随机的 Y 坐标，使得环有一定的厚度
            const y = (Math.random() - 0.5) * 2 * yThickness;
            const phase = Math.random() * 2 * Math.PI;
            this.ringPoints.push({ x, y, z, phase });
        }
    }

    calculateViewRotation(angleX, angleY) {
        const radX = angleX * Math.PI / 180;
        const radY = angleY * Math.PI / 180;
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);
        return { cosX, sinX, cosY, sinY };
    }

    applyViewRotation(point) {
        let y = point.y * this.viewRotation.cosX - point.z * this.viewRotation.sinX;
        let z = point.y * this.viewRotation.sinX + point.z * this.viewRotation.cosX;
        let x = point.x * this.viewRotation.cosY + z * this.viewRotation.sinY;
        z = -point.x * this.viewRotation.sinY + z * this.viewRotation.cosY;
        return { x, y, z };
    }

    handleWheel(event) {
        const delta = event.deltaY;
        this.scale = delta > 0 ? Math.min(this.scale + this.zoomStep, this.maxScale) : Math.max(this.scale - this.zoomStep, this.minScale);
        this.viewerDistance = this.baseViewerDistance * this.scale;
    }

    handleMouseDown(event) {
        this.isDragging = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        event.preventDefault();
    }

    handleMouseMove(event) {
        if (this.isDragging) {
            const deltaX = event.clientX - this.lastMouseX;
            const deltaY = event.clientY - this.lastMouseY;
            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;

            const sensitivity = 0.1;
            this.viewAngleY += deltaX * sensitivity;
            this.viewAngleX += deltaY * sensitivity;
            this.viewAngleX = Math.max(-90, Math.min(90, this.viewAngleX));
            this.viewRotation = this.calculateViewRotation(this.viewAngleX, this.viewAngleY);
        }
    }

    handleMouseUp() {
        this.isDragging = false;
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsedTime = (timestamp - this.startTime) / 1000;

        if (!this.isAnimating) {
            // Skip rendering if animation is paused
            requestAnimationFrame(this.animate);
            return;
        }

        if (!this.ctx) {
            // If context is not available, skip rendering
            requestAnimationFrame(this.animate);
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        const cosAS = Math.cos(this.angleSphere);
        const sinAS = Math.sin(this.angleSphere);

        const cosAR = Math.cos(this.angleRing);
        const sinAR = Math.sin(this.angleRing);

        // 绘制球体点
        this.spherePoints.forEach(point => {
            let x = point.x * this.scale;
            let y = point.y * this.scale;
            let z = point.z * this.scale;

            // 绕 Y 轴旋转
            const rotatedX = x * cosAS - z * sinAS;
            const rotatedZ = x * sinAS + z * cosAS;
            const rotatedY = y;

            // 应用视角旋转
            const viewRotated = this.applyViewRotation({ x: rotatedX, y: rotatedY, z: rotatedZ });
            const finalX = viewRotated.x;
            const finalY = viewRotated.y;
            const finalZ = viewRotated.z;

            // 透视投影
            const scaleProj = this.viewerDistance / (this.viewerDistance + finalZ);
            const projX = finalX * scaleProj + centerX;
            const projY = finalY * scaleProj + centerY;

            // 闪烁效果
            const alpha = (Math.sin(2 * Math.PI * this.blinkFrequency * elapsedTime + point.phase) + 1) / 2;

            this.ctx.fillStyle = `rgba(${this.spherePointColor}, ${alpha * scaleProj})`;
            this.ctx.beginPath();
            this.ctx.arc(projX, projY, this.pointSize, 0, 2 * Math.PI);
            this.ctx.fill();
        });

        // 绘制环点
        this.ringPoints.forEach(point => {
            let x = point.x * this.scale;
            let y = point.y * this.scale;
            let z = point.z * this.scale;

            // 绕 Y 轴旋转
            const rotatedX = x * cosAR - z * sinAR;
            const rotatedZ = x * sinAR + z * cosAR;
            const rotatedY = y;

            // 应用视角旋转
            const viewRotated = this.applyViewRotation({ x: rotatedX, y: rotatedY, z: rotatedZ });
            const finalX = viewRotated.x;
            const finalY = viewRotated.y;
            const finalZ = viewRotated.z;

            // 透视投影
            const scaleProj = this.viewerDistance / (this.viewerDistance + finalZ);
            const projX = finalX * scaleProj + centerX;
            const projY = finalY * scaleProj + centerY;

            // 闪烁效果
            const alpha = (Math.sin(2 * Math.PI * this.blinkFrequency * elapsedTime + point.phase) + 1) / 2;

            this.ctx.fillStyle = `rgba(${this.ringPointColor}, ${alpha * scaleProj})`;
            this.ctx.beginPath();
            this.ctx.arc(projX, projY, this.pointSize, 0, 2 * Math.PI);
            this.ctx.fill();
        });

        // 更新旋转角度
        this.angleSphere += this.rotationSpeedSphere;
        this.angleRing += this.rotationSpeedRing;

        requestAnimationFrame(this.animate);
    }

    pause() {
        this.isAnimating = false;
    }

    resume() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            // Reset startTime to prevent跳跃
            this.startTime = null;
            requestAnimationFrame(this.animate);
        }
    }

    destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.resizeCanvas);
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        // Remove canvas
        if (this.canvas && this.container.contains(this.canvas)) {
            this.container.removeChild(this.canvas);
        }

        this.ctx = null;
        this.canvas = null;
    }
}

export default PointCloudAnimation;
