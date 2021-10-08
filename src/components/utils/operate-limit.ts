type PossibleParams = string | number | boolean | undefined | null | void | Record<string, unknown>;

/**
 * 防抖
 * 定时器实现 立即防抖
 */
const debounceGenerator = () => {
    let timer: number;
    return <T extends PossibleParams[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => funct(...args), wait);
    };
};
export const debounce = debounceGenerator();

/**
 * 节流
 * 时间戳实现
 */
const throttleGenerator = () => {
    let previous = 0;
    return <T extends PossibleParams[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        const now = +new Date();
        if (now - previous > wait) {
            funct(...args);
            previous = now;
        }
    };
};
export const throttle = throttleGenerator();

export default { debounce, throttle };
