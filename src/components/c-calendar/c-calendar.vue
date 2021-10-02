<template>
    <view>
        <view class="a-y-center a-flex-space-between">
            <view class="a-y-center a-mt">
                <view class="arrow-left c-iconfont icon-arrow-lift" @click="switchMonth(0)"></view>
                <view class="show-date">{{ year }}年 {{ month }}月</view>
                <view
                    class="arrow-right c-iconfont icon-arrow-right"
                    @click="switchMonth(1)"
                ></view>
            </view>
            <view class="a-y-center">
                <view class="opt a-y-center a-x-center a-background-blue" @click="jumpDate(today)">
                    今
                </view>
                <view
                    class="opt a-y-center a-x-center a-background-orange"
                    @click="jumpDate(termStart)"
                >
                    开
                </view>
                <view
                    class="opt a-y-center a-x-center a-background-green"
                    @click="jumpDate(vacation.start)"
                >
                    假
                </view>
            </view>
        </view>
        <view>
            <view class="a-y-center a-flex-space-around a-lmt a-lmb">
                <view
                    v-for="(item, index) in weekDay"
                    :key="index"
                    class="a-x-center a-y-center unit"
                >
                    {{ item }}
                </view>
            </view>
            <view
                v-for="(row, rowIndex) in calendar"
                :key="rowIndex"
                class="a-y-center a-flex-space-around a-lmt a-lmb"
            >
                <view v-for="(column, columnIndex) in row" :key="columnIndex">
                    <view
                        class="a-text-center"
                        :class="{
                            'type--purple': column.type.flag,
                            'type--green': column.type.vacation || column.type.weekend,
                            'type--black': column.type.work,
                            'type--today': column.type.today,
                            'type--vacation-start': column.type.vacationStart,
                            'type--term-start': column.type.termStart,
                            'type--not-cur-month': !column.type.currentMonth && !column.type.flag,
                        }"
                    >
                        <view class="unit day">{{ column.day }}</view>
                        <view class="tips">{{ column.type | filterTips }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="a-hr a-mt-20 a-mb-15"></view>
        <view class="a-y-center">
            <view
                v-for="(item, index) in termTips"
                :key="index"
                class="a-y-center"
                :style="'width:' + item.width + '%'"
            >
                <view class="a-dot" :style="'background:' + item.background"></view>
                <view class="a-color-grey">{{ item.name }}:{{ item.tips }}</view>
            </view>
        </view>
        <view class="a-pt-5 a-pb-5"></view>
        <view class="a-y-center">
            <view
                v-for="(item, index) in vacationTips"
                :key="index"
                class="a-y-center"
                :style="'width:' + item.width + '%'"
            >
                <view class="a-dot" :style="'background:' + item.background"></view>
                <view class="a-color-grey">{{ item.name }}:{{ item.tips }}</view>
            </view>
        </view>
        <view class="a-hr a-mt-15"></view>
    </view>
</template>

<script lang="ts">
import { Calendar, CalendarItem } from "../types/calendar";
import { Component, Vue, Prop } from "vue-property-decorator";
import { addDate, formatDate, safeDate, timeDiff } from "../utils/datetime";

@Component({
    filters: {
        filterTips: (type: CalendarItem["type"]): string => {
            if (type.flag) return "周次";
            else if (type.vacation) return "假期";
            else if (type.weekend) return "周末";
            else if (type.work) return "教学";
            return "--";
        },
    },
})
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

    public year = 2021;
    public month: number = safeDate().getMonth() + 1;
    public calendar: Calendar = [];
    public vacation: { distance: number; start: string } = {
        distance: 0,
        start: "",
    };
    public weekDay: Array<string> = ["周", "一", "二", "三", "四", "五", "六", "日"];
    public termTips: Array<{ width: string; name: string; tips: string; background: string }> = [
        { width: "40", name: "学期", tips: "...", background: "#3CB371" },
        { width: "24", name: "周次", tips: "...", background: "#9F8BEC" },
        { width: "36", name: "开学", tips: "...", background: "#FF6347" },
    ];
    public vacationTips: Array<{ width: string; name: string; tips: string; background: string }> =
        [
            { width: "40", name: "假期", tips: "...", background: "#3CB371" },
            { width: "24", name: "周次", tips: "...", background: "#9F8BEC" },
            { width: "36", name: "距假期", tips: "...", background: "#FF6347" },
        ];

    created(): void {
        this.buildVacationInfo();
        this.buildCalendar(safeDate());
        this.buildTips();
    }

    private buildVacationInfo(): void {
        const termStartData = safeDate(this.termStart);
        const vacationDate = addDate(termStartData, 0, 0, (this.vacationWeek - 1) * 7);
        const vacationStartDate = formatDate("yyyy-MM-dd", vacationDate);
        this.vacation.start = vacationStartDate;
        this.vacation.distance = timeDiff(safeDate(), vacationStartDate).days + 1;
    }

    private buildTips(): void {
        const termTipsData: Array<string> = [this.term, this.weekCount.toString(), this.termStart];
        this.termTips = this.termTips.map((item, index) => ({
            ...item,
            tips: termTipsData[index],
        }));
        const vacationTipsData: Array<string> = [
            this.vacation.start,
            this.vacationWeek.toString(),
            this.vacation.distance.toString() + "天",
        ];
        this.vacationTips = this.vacationTips.map((item, index) => ({
            ...item,
            tips: vacationTipsData[index],
        }));
    }

    private getEmptyCalendar(): Calendar {
        return new Array(6).fill(void 0).map(() =>
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
    }

    public buildCalendar(date: Date): void {
        const todayStr = formatDate();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        const calendar: Calendar = this.getEmptyCalendar();
        const monthFirstDay = safeDate(date.getFullYear(), date.getMonth());
        const goBackDays = -(monthFirstDay.getDay() === 0 ? 7 : monthFirstDay.getDay());
        let start = addDate(monthFirstDay, 0, 0, goBackDays);
        calendar.forEach(row =>
            row.forEach((item, index) => {
                const curWeekSerial: number =
                    Math.floor((timeDiff(safeDate(this.termStart), start, true).days + 1) / 7) + 1;
                if (index === 0) {
                    item.type.flag = true;
                    item.day = curWeekSerial > 0 ? curWeekSerial.toString() : "0";
                    return void 0;
                }
                start = addDate(start, 0, 0, 1);
                const startStr = formatDate("yyyy-MM-dd", start);
                const weekDay = start.getDay();
                item.day = formatDate("dd", start);
                item.type = {
                    today: todayStr === startStr,
                    flag: false,
                    work:
                        1 <= weekDay &&
                        weekDay <= 5 &&
                        curWeekSerial < this.vacationWeek &&
                        curWeekSerial > 0,
                    weekend: weekDay === 0 || weekDay === 6,
                    vacation: this.vacationWeek <= curWeekSerial && curWeekSerial <= this.weekCount,
                    currentMonth: start.getMonth() + 1 === this.month,
                    vacationStart: this.vacation.start === startStr,
                    termStart: this.termStart === startStr,
                };
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

    public switchMonth(type: number): void {
        this.buildCalendar(addDate(safeDate(this.year, this.month - 1), 0, type === 0 ? -1 : 1));
    }

    public jumpDate(date: string): void {
        this.buildCalendar(safeDate(date));
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/asse.scss";

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

.unit {
    line-height: 25px;
    width: 25px;
    margin: 2.5px;
}

.tips {
    color: #999;
    font-size: 11px;
}

.type--today > .day {
    background: $a-blue;
}

.type--term-start > .day {
    background: $a-orange;
}

.type--vacation-start > .day {
    background: $a-green;
}

.type--today > .day,
.type--term-start > .day,
.type--vacation-start > .day {
    overflow: hidden;
    border-radius: 30px;
    color: #fff !important;
}

.type--purple,
.type--purple > .tips {
    color: $a-type-primary;
}

.type--green,
.type--green > .tips {
    color: $a-type-success;
}

.type--not-cur-month,
.type--not-cur-month > .tips {
    color: #ddd !important;
}
</style>
