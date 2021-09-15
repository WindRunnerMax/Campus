/**
 * 弹窗提示
 */
export const toast = (msg: string, time = 2000, icon = "none", mask = true): Promise<string> => {
    uni.showToast({
        title: msg,
        icon: icon as Parameters<typeof uni.showToast>[0]["icon"],
        mask: mask,
        duration: time,
    });
    return new Promise(resolve => setTimeout(() => resolve(msg), time));
};

export const confirm = (title: string, content: string): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
        uni.showModal({
            title,
            content,
            success: choice => {
                if (choice.confirm) resolve(true);
                else resolve(false);
            },
        });
    });
};

export default { toast, confirm };
