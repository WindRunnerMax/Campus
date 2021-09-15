<template>
    <view class="content">
        <navigator url="/pages/time-table/time-table" open-type="navigate">
            <i class="iconfont icon-kebiao"></i>
            <view>课表</view>
        </navigator>
        <navigator url="/pages/calendar/calendar" open-type="navigate">
            <i class="iconfont icon-calendar"></i>
            <view>校历</view>
        </navigator>
    </view>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class App extends Vue {
    @Prop() public type!: number;
    @Prop() public size!: number;
}
</script>
