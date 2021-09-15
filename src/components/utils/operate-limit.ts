/**
 * 防抖
 * 定时器实现 立即防抖
 */
const debounceGenerator = (): ((wait: number, funct: any, ...args: any[]) => void) => {
    let timer: number;
    return (wait, funct, ...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => funct(...args), wait);
    };
};
export const debounce = debounceGenerator();

/**
// 防抖
// 定时器实现 非立即防抖
function debounceGenerator(){
    var timer = null;
    return (wait, funct, ...args) => {
        if(!timer) funct(...args);
        clearTimeout(timer);
        timer = setTimeout(() => timer = null, wait);
    }
}
 */

/**
 * 节流
 * 时间戳实现
 */
const throttleGenerator = (): ((wait: number, funct: any, ...args: any[]) => void) => {
    let previous = 0;
    return (wait, funct, ...args) => {
        const now = +new Date();
        if (now - previous > wait) {
            funct(...args);
            previous = now;
        }
    };
};
export const throttle = throttleGenerator();

/*
// 节流
// 定时器实现
function throttleGenerator(){
    var timer = null;
    return (wait, funct, ...args) => {
        if(!timer){
            funct(...args);
            timer = setTimeout(() => timer = null, wait);
        }
    }
}
 */

export default { debounce, throttle };
