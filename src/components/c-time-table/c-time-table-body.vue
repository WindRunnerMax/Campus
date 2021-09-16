<template>
    <view>
        <view class="a-flex">
            <view v-for="(item, index) in dateRow" :key="index" class="week-unit">
                <view class="week-unit--item">{{ item.w }}</view>
                <view class="week-unit--item" :class="item.c">{{ item.d ? item.d : "00/00" }}</view>
            </view>
        </view>
        <view class="a-hr hr"></view>
        <view v-for="(row, rowIndex) in tables" :key="rowIndex">
            <view class="a-flex">
                <view v-for="(column, columnIndex) in row" :key="columnIndex" class="a-full">
                    <view
                        v-if="column.single"
                        class="table-unit"
                        :style="{ 'background': column.single.background }"
                    >
                        <view>
                            <view>{{ column.single.className }}</view>
                            <view>{{ column.single.classRoom }}</view>
                            <view>{{ column.single.teacher }}</view>
                        </view>
                    </view>
                    <view v-else class="table-unit"></view>
                </view>
            </view>
            <view class="a-hr hr"></view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { addDate, formatDate, safeDate } from "../utils/datetime";
import { DefinedTableItem, Tables } from "./types";
const TABLE_CONFIG = {
    ROW: 5,
    COLUMN: 7,
};
const COLOR_LIST = ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFA477", "#FFCA62"];
const WEEK_DAY = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const textFilter = (str: string) =>
    str ? str.replace(/[室]/g, "").replace(/（/g, "(").replace(/）/g, ")") : "";
@Component
export default class CTimeTableBody extends Vue {
    @Prop({
        type: Array,
        required: true,
    })
    table!: Array<DefinedTableItem>;

    @Prop({
        type: Number,
        required: true,
    })
    week!: number;

    @Prop({
        type: String,
        required: true,
    })
    start!: number;

    dateRow: Array<{ w: string; d: string; c: string }> = new Array(7).fill(void 0).map((_, i) => ({
        w: WEEK_DAY[i],
        d: "00/00",
        c: "none",
    }));

    created() {
        this.buildDateRow();
    }

    @Watch("week")
    onWeekChange(): void {
        this.buildDateRow();
    }

    get buildTables(): Tables {
        const tables = this.buildEmptyArray();
        this.table.forEach(v => {
            const rowIndex: number = v.serial - 1;
            const columnIndex: number = rowIndex - 1;
            const namePathNumber: number = Number(
                Array.prototype.reduce.call(v.className, (pre, cur) => pre + cur.charCodeAt(0), 0)
            );
            const single = {
                className: textFilter(v.className),
                classRoom: textFilter(v.classRoom),
                teacher: v.teacher,
                background: COLOR_LIST[namePathNumber % COLOR_LIST.length],
            };
            tables[rowIndex][columnIndex].single = single;
            tables[rowIndex][columnIndex].all.push(single);
        });
        return tables;
    }

    private buildEmptyArray(): Tables {
        return new Array(TABLE_CONFIG.ROW)
            .fill(void 0)
            .map(() => new Array(TABLE_CONFIG.COLUMN).fill(void 0).map(() => ({ all: [] })));
    }

    private buildDateRow(): void {
        const today = safeDate();
        const curWeek = safeDate(this.week);
        const previousWeekend = addDate(curWeek, 0, 0, this.week * 7 - 8);
        const weekDay = [];
        for (let i = 0; i < 7; ++i) {
            const addedDate = addDate(previousWeekend, 0, 0, i);
            weekDay.push({
                w: WEEK_DAY[i],
                d: formatDate("MM/dd", addedDate),
                c: addedDate.getDay() === today.getDay() ? "week-unit--today" : "",
            });
        }
        this.dateRow = weekDay;
    }
}
</script>

<style lang="scss" scoped>
.a-hr {
    margin: 3px 0;
}

.week-unit {
    text-align: center;
    padding: 5px 0 1px 0;
    font-size: 10px;
    width: 100%;
}

.week-unit--item {
    padding: 3px 0;
    font-size: 8px;
}

.week-unit--today {
    border-bottom: 3px solid #eee;
}

.table-unit {
    min-height: 130px;
    margin: 0 1.5px;
    word-break: break-all;
    color: #fff;
    padding: 3px;
    background: #eee;
    font-size: 12px;
    border-radius: 2px;
}
</style>
