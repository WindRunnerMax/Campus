<template>
    <view>
        <layout title="课表" :top-space="false">
            <view class="y-center status-con">
                <view class="week">第{{week}}周</view>
                <view class="y-center">
                    <view class="a-btn a-btn-white a-btn-mini refresh" @tap="refresh(week)">
                        <view class="iconfont icon-shuaxin1"></view>
                    </view>
                    <view class="a-btn a-btn-white a-btn-mini pre" @tap="pre(week)">
                        <view class="iconfont icon-arrow-lift"></view>
                    </view>
                    <view class="a-btn a-btn-white a-btn-mini next" @tap="next(week)">
                        <view class="iconfont icon-arrow-right"></view>
                    </view>
                </view>
            </view>
            <view class="a-hr hr"></view>
            <view class="a-flex">
                <view v-for="(item, index) in [0,1,2,3,4,5,6]" :key="index" class="week-unit">
                    <view>{{date[index].n}}</view>
                    <view :class="date[index].s">{{date[index].d ? date[index].d : "00/00"}}</view>
                </view>
            </view>
            <view class="a-hr hr"></view>
            <view v-for="column in [0,1,2,3,4]" :key="column" >
                <view class="a-flex" >
                    <view v-for="row in [0,1,2,3,4,5,6]" :key="row" class="a-full">
                        <view v-if="computedTable[column] && computedTable[column][row]" class="table-unit"
                            :style="{'background':computedTable[column][row].background}">
                            <view v-for="(unit, index) in computedTable[column][row].table" :key="index">{{unit}}</view>
                        </view>
                        <view v-else class="table-unit"></view>
                    </view>
                </view>
                <view class="a-hr hr"></view>
            </view>
        </layout>
    </view>
</template>

<script>
    import { formatDate, extDate } from "../utils/datetime.js";
    import layout from "../common/layout.vue"
    export default {
        components:{
            layout
        },
        name: "time-table",
        data: function() {
            return {
                date: []
            };
        },
        props: {
            table: {
                type: Array,
                default: () => []
            },
            week: {
                type: Number,
                default: 1
            },
            termStart: {
                type: String,
                default: "2020-01-01"
            }
        },
        beforeCreate: function(){
            extDate();
        },
        created: function() {
            var week = this.week;
            var today = new Date();
            var curWeekDate = new Date(this.termStart);
            curWeekDate.addDate(0, 0, week * 7 - 8);
            var allWeekDay = [];
            var week = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
            for (let i = 0; i < 7; ++i) {
                curWeekDate.addDate(0, 0, 1);
                allWeekDay.push({
                    n: week[i],
                    d: formatDate("MM/dd", curWeekDate),
                    s: curWeekDate.getDay() === today.getDay() ? "today" : "none"
                });
            }
            this.date = allWeekDay;
        },
        computed: {
            computedTable: function(){
                var colorList = ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFA477", "#FFCA62"];
                var target = [];
                this.table.forEach( v => {
                    --v.week;
                    --v.serial;
                    if(!target[v.week]) target[v.week] = [];
                    if(!target[v.week][v.serial]) target[v.week][v.serial] = {background: "#eee", table: []};
                    var namePath = Array.prototype.reduce.call(v.name, (pre, cur) => pre+cur.charCodeAt(0), 0);
                    target[v.week][v.serial].background = colorList[namePath % colorList.length];
                    if(target[v.week][v.serial].table.length) target[v.week][v.serial].table.push("---");
                    target[v.week][v.serial].table.push(v.name, v.loc, v.teacher);
                })
                return target;
            }
        },
        methods:{
            refresh: function(week){
                this.$emit("refresh", week);
            },
            pre: function(week){
                this.$emit("pre", week);
            },
            next: function(week){
                this.$emit("next", week);
            },
        }
    }
</script>

<style scoped>
    @import "../utils/resources/asse.mini.wxss";
    @import "../utils/resources/iconfont.wxss";

    .status-con {
        padding: 5px;
        height: 30px;
        justify-content: space-between;
    }

    .pre,
    .next,
    .refresh {
        font-size: 14px;
        margin-left: 10px;
        width: 20px;
    }

    .a-btn {
        margin: 0 3px;
    }

    .hr {
        margin: 3px 0;
    }

    .week-unit {
        text-align: center;
        padding: 5px 0 1px 0;
        font-size: 10px;
        width: 100%;
    }

    .week-unit>view {
        padding: 3px 0;
        font-size: 8px;
    }

    .today {
        border-bottom: 3px solid #eee;
    }

    .table-unit{
        min-height: 130px;
        margin: 0 1.5px;
        /* text-align: center; */
        word-break: break-all;
        color: #fff;
        padding: 3px;
        background: #eee;
        font-size: 12px;
        border-radius: 2px;
    }
</style>
