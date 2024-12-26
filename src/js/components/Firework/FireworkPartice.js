//!=================================烟花动画=================================//
class Firework {
    constructor(canvas) {
        // 初始化烟花的起始位置和速度
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * this.canvas.width; // 随机的水平位置
        this.y = this.canvas.height; // 垂直方向从底部发射
        this.sx = Math.random() * 3 - 1.5; // 水平方向的速度
        this.sy = Math.random() * -3 - 3; // 垂直方向的速度
        this.size = Math.random() * 2 + 1; // 烟花的大小
        this.shouldExplode = false; // 判断烟花是否应该爆炸

        // 随机生成颜色值 (RGB)
        const colorVal = Math.round(0xffffff * Math.random());
        const r = colorVal >> 16;
        const g = (colorVal >> 8) & 255;
        const b = colorVal & 255;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    // 更新烟花的状态
    update() {
        if (this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= this.canvas.width) {
            this.shouldExplode = true;
        } else {
            this.sy += 0.01; // 模拟重力
        }

        this.x += this.sx;
        this.y += this.sy;
    }

    // 绘制烟花
    draw() {
        this.ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`; // 设置烟花的颜色
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // 绘制圆形烟花
        this.ctx.fill();
    }
}

class Particle {
    constructor(x, y, r, g, b, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.sx = Math.random() * 3 - 1.5; // 粒子水平速度
        this.sy = Math.random() * 3 - 1.5; // 粒子垂直速度
        this.size = Math.random() * 2 + 1; // 粒子大小
        this.life = 100; // 粒子的生命值
        this.r = r; // 红色分量
        this.g = g; // 绿色分量
        this.b = b; // 蓝色分量
    }

    // 更新粒子的状态
    update() {
        this.x += this.sx; // 更新水平位置
        this.y += this.sy; // 更新垂直位置
        this.life -= 1; // 每次更新生命值减少
    }

    // 绘制粒子
    draw() {
        // 设置粒子的颜色和透明度，随生命值减少而逐渐消失
        this.ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.life / 100})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // 绘制圆形粒子
        this.ctx.fill();
    }
}

// 动画函数，负责持续更新并绘制烟花和粒子
function generateFirework (ctx, canvas, fireworks, particles) {
    // 设置背景颜色为黑色，稍微透明，用于创造拖尾效果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 清空画布并填充背景

    // 随机生成新的烟花
    if (Math.random() < 0.05) {
        fireworks.push(new Firework(canvas));
    }

    // 更新并绘制烟花
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();

        // 如果烟花应该爆炸，创建多个粒子，并从数组中移除烟花
        if (fireworks[i].shouldExplode) {
            for (let j = 0; j < 50; j++) {
                particles.push(new Particle(fireworks[i].x, fireworks[i].y, fireworks[i].r, fireworks[i].g, fireworks[i].b, canvas));
            }
            fireworks.splice(i, 1); // 移除已经爆炸的烟花
        }
    }

    // 更新并绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // 如果粒子的生命值耗尽，则从数组中移除
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    // 请求下一帧继续动画
    requestAnimationFrame(() => generateFirework(ctx, canvas, fireworks, particles));
};

function resizeCanvas (canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};



export {
    Firework, Particle, generateFirework, resizeCanvas
 };