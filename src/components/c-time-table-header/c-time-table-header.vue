<template>
    <view class="a-y-center status-con a-flex-space-between a-pt">
        <view class="a-lml a-mt">第{{ week }}周</view>
        <view class="a-y-center">
            <view class="a-btn a-btn-white a-btn-mini refresh" @click="$emit('refresh', week)">
                <view class="c-iconfont icon-refresh"></view>
            </view>
            <view class="a-btn a-btn-white a-btn-mini pre" @click="$emit('previous', week)">
                <view class="c-iconfont icon-arrow-lift"></view>
            </view>
            <view class="a-btn a-btn-white a-btn-mini next" @click="$emit('next', week)">
                <view class="c-iconfont icon-arrow-right"></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CTimeTableHeader extends Vue {
    @Prop({ type: Number, required: true, validator: v => v > 0 })
    public week!: number;
}
</script>

<style lang="scss" scoped>
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
