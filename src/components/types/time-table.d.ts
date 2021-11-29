export interface TableItem {
    className: string; // 课程名
    classRoom: string; // 教室名
    teacher: string; // 教师名
    background: string; // 背景颜色
}
export type Tables = Array<
    Array<{
        single?: TableItem;
        all: Array<TableItem>;
    }>
>;
export type DefinedTableItem = TableItem & {
    week: number; // 周几的课
    serial: number; // 第几节 `5`节制
    ext?: string; // 扩展信息
    background?: string; // 背景颜色 无则自动计算
    curWeek?: boolean; // 若为该周的课 则优先显示 
};
