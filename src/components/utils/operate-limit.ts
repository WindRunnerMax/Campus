/**
 * 防抖
 * 定时器实现 立即防抖
 */
const debounceFactory = () => {
    let timer: number;
    return <T extends unknown[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => funct(...args), wait);
    };
};
export const debounce = debounceFactory();

/**
 * 节流
 * 时间戳实现
 */
const throttleFactory = () => {
    let previous = 0;
    return <T extends unknown[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        const now = +new Date();
        if (now - previous > wait) {
            funct(...args);
            previous = now;
        }
    };
};
export const throttle = throttleFactory();

export default { debounce, throttle };
