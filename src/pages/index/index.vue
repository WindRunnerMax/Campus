<template>
    <view class="content">
        <navigator url="/pages/time-table/time-table" open-type="navigate">
            <i class="c-iconfont icon-time-table"></i>
            <view>课表</view>
        </navigator>
        <navigator url="/pages/calendar/calendar" open-type="navigate">
            <i class="c-iconfont icon-calendar"></i>
            <view>校历</view>
        </navigator>
        <navigator url="/pages/tour/tour" open-type="navigate">
            <i class="c-iconfont icon-nav"></i>
            <view>校园导览</view>
        </navigator>
    </view>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class App extends Vue {}
</script>
