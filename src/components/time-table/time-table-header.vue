<template>
    <view class="y-center status-con a-flex-space-between">
        <view class="a-text-center">第{{ week }}周</view>
        <view class="y-center">
            <view class="a-btn a-btn-white a-btn-mini refresh" @tap="$emit('refresh')">
                <view class="iconfont icon-shuaxin1"></view>
            </view>
            <view class="a-btn a-btn-white a-btn-mini pre" @tap="$emit('previous')">
                <view class="iconfont icon-arrow-lift"></view>
            </view>
            <view class="a-btn a-btn-white a-btn-mini next" @tap="$emit('next')">
                <view class="iconfont icon-arrow-right"></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CTimeTableHeader extends Vue {
    @Prop({ type: Number, required: true, validator: v => v > 0 })
    week!: number;
}
</script>

<style lang="scss" scoped>
@import "../styles/asse.css";
@import "../styles/asse.scss";
@import "../styles/iconfont.css";

.container {
    padding: 5px;
    height: 30px;
}

.pre,
.next,
.refresh {
    font-size: 14px;
    margin-left: 10px;
    width: 20px;
}
</style>
