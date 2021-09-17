/**
 * 安全地使用Date对象 兼容IOS
 */
export function safeDate(): Date;
export function safeDate(date: Date): Date;
export function safeDate(timestamp: number): Date;
export function safeDate(dateTimeStr: string): Date;
export function safeDate(compatible: number | string | Date): Date;
export function safeDate(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
): Date;
export function safeDate(
    p1?: Date | number | string,
    p2?: number,
    p3?: number,
    p4?: number,
    p5?: number,
    p6?: number,
    p7?: number
): Date | never {
    if (p1 === void 0) {
        // 无参构建
        return new Date();
    } else if (p1 instanceof Date || (typeof p1 === "number" && p2 === void 0)) {
        // 第一个参数为`Date`或者`Number`且无第二个参数
        return new Date(p1);
    } else if (typeof p1 === "number" && typeof p2 === "number") {
        // 第一和第二个参数都为`Number`
        return new Date(p1, p2, p3 || 1, p4 || 0, p5 || 0, p6 || 0, p7 || 0);
    } else if (typeof p1 === "string") {
        // 第一个参数为`String`
        return new Date(p1.replace(/-/g, "/"));
    }
    throw new Error("No suitable parameters");
}
/**
 * yyyy年 MM月 dd日 hh1~12小时制(1-12) HH24小时制(0-23) mm分 ss秒 S毫秒 K周
 */
export const formatDate = (fmt = "yyyy-MM-dd", date = safeDate()): string => {
    const week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const o: { [key: string]: string | number } = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds(), //毫秒
        "K": week[date.getDay()],
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    Object.keys(o).forEach(k => {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k].toString() : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    });
    return fmt;
};
/**
 * 增加时间
 */
export const addDate = (date: Date, years = 0, months = 0, days = 0): Date => {
    const newDate = safeDate(date);
    if (days !== 0) newDate.setDate(newDate.getDate() + days);
    if (months !== 0) newDate.setMonth(newDate.getMonth() + months);
    if (years !== 0) newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
};

/**
 * 精确的时间差
 */
export const timeDiff = (
    startDateString: string | number | Date,
    endDateString: string | number | Date,
    abs = false
): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} => {
    const oldDate = safeDate(startDateString);
    const newDate = safeDate(endDateString);
    const sign = abs ? (newDate.getTime() - oldDate.getTime() > 0 ? 1 : -1) : 1;
    const diffTime = Math.abs(newDate.getTime() - oldDate.getTime()) / 1000; // 转为秒
    const days = Math.floor(diffTime / 86400);
    const hours = Math.floor(diffTime / 3600) - 24 * days;
    const minutes = Math.floor((diffTime % 3600) / 60);
    const seconds = Math.floor(diffTime % 60);
    return {
        days: days * sign,
        hours: hours * sign,
        minutes: minutes * sign,
        seconds: seconds * sign,
    };
};
export default { safeDate, formatDate, addDate, timeDiff };
