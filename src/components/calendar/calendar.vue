<template>
    <view>
        <view class="y-center a-flex-space-between">
            <view class="y-center">
                <view class="arrow-left iconfont icon-arrow-lift" @click="switchMonth(0)"></view>
                <view class="show-date">{{ year }}年 {{ month }}月</view>
                <view class="arrow-right iconfont icon-arrow-right" @click="switchMonth(1)"></view>
            </view>
            <view class="y-center">
                <view class="opt y-center x-center a-background-orange" @click="jumpDate(today)">
                    今
                </view>
                <view class="opt y-center x-center a-background-blue" @click="jumpDate(termStart)">
                    开
                </view>
                <view
                    class="opt y-center x-center a-background-green"
                    @click="jumpDate(vacationStartDate)"
                >
                    假
                </view>
            </view>
        </view>
        <view>
            <view class="y-center line">
                <view v-for="(item, index) in weekDay" :key="index" class="unit">
                    {{ item }}
                </view>
            </view>
            <view v-for="(row, rowIndex) in calendar" :key="rowIndex" class="line">
                <view v-for="(column, columnIndex) in row" :key="columnIndex">
                    <view class="">
                        <view class="">{{ column.day }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Calendar } from "./types";
import { Component, Vue, Prop } from "vue-property-decorator";
import { addDate, formatDate, safeDate, timeDiff } from "../utils/datetime";

@Component
export default class CCalendar extends Vue {
    @Prop({ type: String, required: true })
    term!: string;
    @Prop({ type: String, required: true })
    termStart!: string;
    @Prop({ type: Number, required: true })
    weekCount!: number;
    @Prop({ type: Number, required: true })
    vacationWeek!: number;
    @Prop({ type: Array, default: () => [] })
    workDay!: Array<string>;
    @Prop({ type: Array, default: () => [] })
    vacationDay!: Array<string>;

    year: number = 2021;
    month: number = safeDate().getMonth() + 1;
    calendar: Calendar = [];
    vacation: { distance: number; start: string } = {
        distance: 0,
        start: "",
    };
    weekDay: Array<string> = ["周", "一", "二", "三", "四", "五", "六", "日"];

    created() {
        this.buildVacationInfo();
        this.buildCalendar(safeDate());
    }

    buildVacationInfo(): void {
        const termStartData = safeDate(this.termStart);
        const vacationDate = addDate(termStartData, 0, 0, (this.vacationWeek - 1) * 7);
        const vacationStartDate = formatDate("yyyy-MM-dd", vacationDate);
        this.vacation.start = vacationStartDate;
        this.vacation.distance = timeDiff(safeDate(), vacationStartDate).days;
    }

    buildCalendar(date: Date): void {
        const todayStr = formatDate();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        const calendar: Calendar = new Array(6).fill(void 0).map(() =>
            new Array(8).fill(void 0).map(() => ({
                day: "",
                type: {
                    today: false,
                    flag: false,
                    work: false,
                    weekend: false,
                    vacation: false,
                    currentMonth: false,
                    vacationStart: false,
                    termStart: false,
                },
            }))
        );
        const monthFirstDay = safeDate(date.getFullYear(), date.getMonth());
        const goBackDays = -(monthFirstDay.getDay() === 0 ? 7 : monthFirstDay.getDay());
        let start = addDate(monthFirstDay, 0, 0, goBackDays);
        calendar.forEach(row =>
            row.forEach((item, index) => {
                const curWeekSerial: number =
                    Math.floor(timeDiff(safeDate(this.termStart), start).days / 7) + 1;
                if (index === 0) {
                    item.type.flag = true;
                    item.day = curWeekSerial.toString();
                    return void 0;
                }
                start = addDate(monthFirstDay, 0, 0, 1);
                item.day = formatDate("dd", start);
                const startStr = formatDate("yyyy-MM-dd", start);
                const weekDay = start.getDay();
                if (start.getMonth() + 1 === this.month) {
                    item.type.currentMonth = true;
                }
                if (1 <= weekDay && weekDay <= 5 && curWeekSerial < this.vacationWeek) {
                    item.type.work = true;
                }
                if (weekDay === 0 || weekDay === 6) {
                    item.type.weekend = true;
                }
                if (todayStr === startStr) {
                    item.type.today = true;
                }
                if (this.termStart === startStr) {
                    item.type.termStart = true;
                }
                if (this.vacation.start === startStr) {
                    item.type.vacationStart = true;
                }
                if (this.vacationWeek <= curWeekSerial && curWeekSerial <= this.weekCount) {
                    item.type.vacation = true;
                }
                if (this.workDay.indexOf(startStr) !== -1) {
                    item.type.work = true;
                    item.type.vacation = false;
                    item.type.weekend = false;
                }
                if (this.vacationDay.indexOf(startStr) !== -1) {
                    item.type.work = false;
                    item.type.vacation = true;
                }
            })
        );
        this.calendar = calendar;
    }

    switchMonth(type: number) {
        this.buildCalendar(addDate(safeDate(this.year, this.month), 0, type === 0 ? -1 : 1));
    }

    jumpDate(date: string) {
        this.buildCalendar(safeDate(date));
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/asse.css";
@import "../styles/asse.scss";
@import "../styles/iconfont.css";

.show-date {
    margin: 10px 20px;
    font-weight: bold;
}

.opt {
    width: 20px;
    line-height: 20px;
    padding: 4px;
    margin: 0 10px;
    color: #fff;
    background-color: $a-type-primary;
    border-radius: 30px;
}
</style>
