export interface TableItem {
    className: string;
    classRoom: string;
    teacher: string;
    background: string;
}
export type Tables = Array<
    Array<{
        single?: TableItem;
        all: Array<TableItem>;
    }>
>;
export type DefinedTableItem = TableItem & {
    week: number;
    serial: number;
};
