
function debounce(func, duration = 1000) {
    let timeId;//记录上一次的定时器
    return function (...args) { //传入剩余参数
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            func(...args);
        }, duration);
    };
}

function singleton(className) {
    let instance;
    const proxy = new Proxy(className, {
        construct(target, args) {
            if (!instance) {
                instance = Reflect.construct(target, args);
            }
            return instance;
        }
    });
    className.prototype.constructor = proxy;
    return proxy;
}

export {
    debounce,
    singleton
}