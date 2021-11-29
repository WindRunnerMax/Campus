<template>
    <view>
        <!-- section 课表主体 S -->
        <view class="a-flex">
            <view v-for="(item, index) in dateRow" :key="index" class="week-unit">
                <view class="week-unit--item">{{ item.w }}</view>
                <view class="week-unit--item week-unit--default" :class="item.c">
                    {{ item.d ? item.d : "00/00" }}
                </view>
            </view>
        </view>
        <view class="a-hr hr"></view>
        <view v-for="(row, rowIndex) in buildTables" :key="rowIndex">
            <view class="a-flex">
                <view
                    v-for="(column, columnIndex) in row"
                    :key="columnIndex"
                    class="a-flex a-flex-full"
                    @click="column.single && showDetail(column.all)"
                >
                    <view
                        v-if="column.single"
                        class="a-flex-full table-unit"
                        :style="{ 'background': column.single.background }"
                    >
                        <view>
                            <view>{{ column.single.className }}</view>
                            <view>{{ column.single.classRoom }}</view>
                            <view>{{ column.single.teacher }}</view>
                            <view v-if="column.single.ext">{{ column.single.ext }}</view>
                        </view>
                        <view v-if="column.all.length > 1" class="triangle"></view>
                    </view>
                    <view v-else class="table-unit a-flex-full"></view>
                </view>
            </view>
            <view class="a-hr hr"></view>
        </view>
        <!-- section 课表主体 S -->

        <!-- section 课表详细信息弹窗 S -->
        <c-dialog :visible.sync="dialog.show">
            <view class="dialog">
                <view
                    v-for="(item, index) in dialog.content"
                    :key="index"
                    class="a-mt-10 a-mb-10"
                    :class="{ 'a-lmt': index }"
                >
                    <view class="a-y-center">
                        <view class="a-dot" :style="{ 'background': item.background }"></view>
                        <view>{{ item.className }}</view>
                    </view>
                    <view class="a-flex-space-between a-pt">
                        <view class="a-y-center">
                            <view class="a-dot a-background-grey"></view>
                            <view>教室</view>
                        </view>
                        <view>{{ item.classRoom }}</view>
                    </view>
                    <view class="a-flex-space-between a-pt">
                        <view class="a-y-center">
                            <view class="a-dot a-background-grey"></view>
                            <view>讲师</view>
                        </view>
                        <view>{{ item.teacher }}</view>
                    </view>
                    <view v-if="item.ext" class="a-flex-space-between a-pt">
                        <view class="a-y-center">
                            <view class="a-dot a-background-grey"></view>
                            <view>{{ item.ext }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </c-dialog>
        <!-- section 课表详细信息弹窗 E -->
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { addDate, formatDate, safeDate } from "../utils/datetime";
import { DefinedTableItem, TableItem, Tables } from "../types/time-table";
import CDialog from "../c-dialog/c-dialog.vue";
const TABLE_CONFIG = {
    ROW: 5,
    COLUMN: 7,
};
const COLOR_LIST = ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFA477", "#FFCA62"];
const WEEK_DAY = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

@Component({
    components: { CDialog },
})
export default class CTimeTableBody extends Vue {
    @Prop({ type: Array, required: true })
    table!: Array<DefinedTableItem>;

    @Prop({ type: Number, required: true })
    week!: number;

    @Prop({ type: String, required: true })
    start!: number;

    public dateRow: Array<{ w: string; d: string; c: string }> = new Array(7)
        .fill(void 0)
        .map((_, i) => ({
            w: WEEK_DAY[i],
            d: "00/00",
            c: "",
        }));

    public dialog: { show: boolean; content: Array<TableItem> } = {
        show: false,
        content: [],
    };

    created(): void {
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
            const columnIndex: number = v.week - 1;
            const namePathNumber = Number(
                Array.prototype.reduce.call(v.className, (pre, cur) => pre + cur.charCodeAt(0), 0)
            );
            const single = {
                className: v.className,
                classRoom: v.classRoom,
                teacher: v.teacher,
                background: v.background || COLOR_LIST[namePathNumber % COLOR_LIST.length],
                ext: v.ext,
                curWeek: v.curWeek,
            };
            if (tables[rowIndex][columnIndex].single) {
                if (single.curWeek) tables[rowIndex][columnIndex].single = single;
            } else {
                tables[rowIndex][columnIndex].single = single;
            }
            tables[rowIndex][columnIndex].all.push(single);
        });
        return tables;
    }

    buildEmptyArray(): Tables {
        return new Array(TABLE_CONFIG.ROW)
            .fill(void 0)
            .map(() => new Array(TABLE_CONFIG.COLUMN).fill(void 0).map(() => ({ all: [] })));
    }

    buildDateRow(): void {
        const todayStr = formatDate("MM/dd", safeDate());
        const curWeek = safeDate(this.start);
        const previousWeekend = addDate(curWeek, 0, 0, this.week * 7 - 7);
        const weekDay = [];
        for (let i = 0; i < 7; ++i) {
            const addedDate = addDate(previousWeekend, 0, 0, i);
            const addedDateStr = formatDate("MM/dd", addedDate);
            weekDay.push({
                w: WEEK_DAY[i],
                d: addedDateStr,
                c: addedDateStr === todayStr ? "week-unit--today" : "",
            });
        }
        this.dateRow = weekDay;
    }

    showDetail(content: Array<TableItem>): void {
        this.dialog.show = true;
        this.dialog.content = content;
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/asse.scss";

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

.week-unit--default {
    border-bottom: 3px solid #fff;
}

.week-unit--today {
    border-color: #eee;
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
    position: relative;
}

.triangle {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 13px solid rgba(255, 255, 255, 0.8);
    border-left: 13px solid transparent;
}

.dialog {
    color: $a-font-grey;
    width: 300px;
}
</style>
