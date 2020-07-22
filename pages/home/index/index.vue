<template>
    <view>
        <layout title="学习" color="#FF6347" :inherit-color="true">
            <view class="y-center">
                <navigator url="/pages/study/time-table/time-table" open-type="navigate" class="unit">
                    <i class="iconfont icon-kebiao"></i>
                    <view>课表</view>
                </navigator>
                <view class="unit">
                    <i class="iconfont icon-classroom"></i>
                    <view>教室</view>
                </view>
                <view class="unit">
                    <i class="iconfont icon-grade"></i>
                    <view>成绩</view>
                </view>
            </view>
        </layout>

        <layout title="信息" color="#3CB371;" :inherit-color="true">
            <view class="y-center">
                <view class="unit">
                    <i class="iconfont icon-lib"></i>
                    <view>图书检索</view>
                </view>
                <view class="unit">
                    <i class="iconfont icon-borrow"></i>
                    <view>借阅查询</view>
                </view>
                <view class="unit">
                    <i class="iconfont icon-biji-copy"></i>
                    <view>考试安排</view>
                </view>
            </view>
        </layout>

        <layout title="生活" color="#9F8BEC" :inherit-color="true">
            <view class="y-center">
                <navigator url="/pages/life/calendar/calendar" open-type="navigate" class="unit">
                    <i class="iconfont icon-calendar"></i>
                    <view>校历</view>
                </navigator>
                <view class="unit">
                    <i class="iconfont icon-vacation"></i>
                    <view>放假安排</view>
                </view>
                <view class="unit">
                    <i class="iconfont icon-link"></i>
                    <view>分享链接</view>
                </view>
            </view>
        </layout>


    </view>
</template>

<script>
    import layout from "@/components/common/layout.vue";
    export default {
        components: {
            layout
        },
        data: function() {
            return {}
        },
        methods: {

        }
    }
</script>

<style>
    .unit {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
    }

    .unit>view {
        color: #000000;
    }

    .iconfont {
        font-size: 27px;
        color: inherit !important;
        margin: 10px 0;
    }
</style>
