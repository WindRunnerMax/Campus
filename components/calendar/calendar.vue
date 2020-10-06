<template>
    <view>

        <layout>
            <view class="y-center head">
                <view class="y-center">
                    <view class="arrow-left iconfont icon-arrow-lift" @tap="switchMonth" data-s="l"></view>
                    <view class="show-date">{{curYear}}年 {{curMonth}}月</view>
                    <view class="arrow-right iconfont icon-arrow-right" @tap="switchMonth" data-s="r"></view>
                </view>
                <view class="y-center">
                    <view class="opt y-center x-center" style="background-color: #1E9FFF;" @tap="jumpDate" :data-d="today">今</view>
                    <view class="opt y-center x-center" style="background-color: #FF6347;" @tap="jumpDate" :data-d="termStart">开</view>
                    <view class="opt y-center x-center" style="background-color: #3CB371;" @tap="jumpDate" :data-d="vacationStartDate">假</view>
                </view>
            </view>

            <view>
                <view class="y-center line">
                    <view v-for='(item,index) in ["周","一","二","三","四","五","六","日"]' :key="index" class="unit">{{item}}</view>
                </view>
                <view v-for="(item,index) in calendarData" :key="index" class="line">
                    <view v-for="(innerItem,innerIndex) in item" :key="innerIndex">
                        <view class="unit-con" :class="innerItem.color">
                            <view class="unit u view">{{innerItem.day}}</view>
                            <view class="x-center intro view" :class="innerItem.detach">{{innerItem.type}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </layout>

        <layout>
            <view class="card y-center info">
                <view style="width: 40%;" class="view">
                    <view class="a-dot" style="background: #3CB371;"></view>
                    <view class="view">学期:{{term}}</view>
                </view>
                <view style="width: 24%;" class="view">
                    <view class="a-dot" style="background: #9F8BEC;"></view>
                    <view class="view">周次:{{weekCount}}</view>
                </view>
                <view style="width: 36%;" class="view">
                    <view class="a-dot" style="background: #FF6347;"></view>
                    <view class="view">开学:{{termStart}}</view>
                </view>
            </view>
        </layout>

        <layout>
            <view class="y-center info">
                <view style="width: 40%;" class="view">
                    <view class="a-dot" style="background: #3CB371;"></view>
                    <view class="view">假期:{{vacationStartDate}}</view>
                </view>
                <view style="width: 24%;" class="view">
                    <view class="a-dot" style="background: #9F8BEC;"></view>
                    <view class="view">周次:{{vacationStart}}</view>
                </view>
                <view style="width: 36%;" class="view">
                    <view class="a-dot" style="background: #FF6347;"></view>
                    <view class="view">距假期:{{vacationDateDiff}}天</view>
                </view>
            </view>
        </layout>

    </view>
</template>

<script>
    import { formatDate, extDate, dateDiff } from "../utils/datetime.js";
    import layout from "../common/layout.vue"
    const date = new Date();
    export default {
        components: {
            layout
        },
        data: function() {
            return {
                calendarData: [],
                vacationDateDiff: 0,
                vacationStartDate: "",
                curMonth: formatDate("MM", date),
                curYear: formatDate("yyyy", date),
                today: formatDate(undefined, date)
            };
        },
        props: {
            term: {
                type: String,
                default: '2019-2020-2',
            },
            termStart: {
                type: String,
                default: '2020-02-10',
            },
            weekCount: {
                type: Number,
                default: 29
            },
            vacationStart: {
                type: Number,
                default: 24
            }
        },
        beforeCreate: function() {
            extDate();
        },
        created: function() {
            this.calcVacation();
            this.redayForDate(date);
        },
        methods: {
            bindPickerChange: function(e) {
                this.index = e.detail.value;
                var curObj = this.data[this.index];
                this.term = curObj.term;
                this.weekCount = curObj.weekcount;
                this.termStart = curObj.startdata;
                this.vacationStart = curObj.vacationstart;
                this.calcVacation();
                this.redayForDate(date);
            },
            jumpDate: function(e) {
                var d = new Date(e.currentTarget.dataset.d);
                this.curMonth = formatDate("MM", d);
                this.curYear = formatDate("yyyy", d);
                this.redayForDate(d);
            },
            switchMonth: function(e) {
                var d = new Date(this.curYear + "-" + this.curMonth + "-01");
                var s = e.currentTarget.dataset.s;
                if (s === "l") d.addDate(0, -1);
                else d.addDate(0, 1);
                this.curMonth = formatDate("MM", d);
                this.curYear = formatDate("yyyy", d);
                this.redayForDate(d);
            },
            redayForDate: function(date) {
                var curMonthDay = formatDate("yyyy-MM-01", date);
                var monthStart = new Date(curMonthDay);
                var monthStartWeekDay = monthStart.getDay();
                monthStartWeekDay = monthStartWeekDay === 0 ? 7 : monthStartWeekDay;
                var calendarStart = monthStart;
                calendarStart.addDate(0, 0, -(monthStartWeekDay - 1));
                this.showCalendar(calendarStart);
            },
            showCalendar: function(start) {
                var showArr = [];
                for (let i = 0; i < 6; ++i) {
                    let innerArr = [];
                    let week = 0;
                    for (let k = 0; k < 7; ++k) {
                        let unitDate = formatDate("yyyy-MM-dd", start);
                        if (k === 0) {
                            week = parseInt((dateDiff(this.termStart, unitDate) / 7)) + 1;
                            week = week > 0 ? week : 0;
                            innerArr.push({day: week,color: "week ",type: "周次",detach: ""})
                        }
                        let unitObj = {day: unitDate.split("-")[2],color: "not-cur-month ",type: "--",detach: ""};
                        if (formatDate("MM", start) === this.curMonth) unitObj.color = "cur-month ";
                        if (unitDate === this.today) unitObj.color = "today ";
                        if (unitDate === this.termStart) unitObj.color = "term-start ";
                        if (unitDate === this.vacationStartDate) unitObj.color = "vacation-start ";
                        if (k === 5 || k === 6) {
                            unitObj.type = "周末";
                            unitObj.color += "weekend ";
                        } else if (week && week <= this.weekCount) {
                            var tmpColor = "classes ";
                            unitObj.type = "教学";
                            unitObj.detach = "cdetach";
                            if (week >= this.vacationStart) {
                                unitObj.type = "假期";
                                tmpColor = "vacation ";
                                unitObj.detach = "";
                            }
                            unitObj.color += tmpColor;
                        }
                        innerArr.push(unitObj);
                        start.addDate(0, 0, 1);
                    }
                    showArr.push(innerArr);
                }
                this.calendarData = showArr;
                this.show = 1
            },
            calcVacation: function() {
                var d = new Date(this.termStart);
                d.addDate(0, 0, (this.vacationStart - 1) * 7);
                var vacationStartDate = formatDate(undefined, d);
                this.vacationStartDate = vacationStartDate;
                this.vacationDateDiff = dateDiff(this.today, vacationStartDate);
            }
        }
    }
</script>

<style>
    .head {
        justify-content: space-between;
        margin: 5px 5px 5px 10px;
    }

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
        background-color: #9F8BEC;
        border-radius: 30px;
    }

    .line {
        display: flex;
        justify-content: space-around;
        align-content: center;
        margin: 10px 0;
    }

    .unit {
        line-height: 25px;
        width: 25px;
        margin: 2.5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .unit-con {
        color: #333;
    }

    .unit-con > .view {
        color: inherit;
    }

    .not-cur-month {
        color: #ddd !important;
    }

    .today>.u,
    .term-start>.u,
    .vacation-start>.u {
        color: #fff !important;
        border-radius: 30px;
        background: #1E9FFF;
    }

    .term-start>.u {
        background: #FF6347;
    }

    .vacation-start>.u {
        background: #3CB371;
    }

    .week {
        color: #9F8BEC;
    }

    .intro {
        font-size: 11px;
    }

    .cur-month>.cdetach {
        color: #999;
    }

    .weekend,
    .vacation {
        color: #3CB371;
    }

    .arrow-left,
    .arrow-right {
        font-size: 20px;
    }

    .a-dot {
        margin-right: 5px;
    }

    .a-dot + .view {
        margin-right: 5px;
    }

    .info > .view {
        display: flex;
        align-items: center;
    }
</style>
