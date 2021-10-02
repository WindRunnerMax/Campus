<template>
    <view v-if="visible">
        <view class="container" @click="close">
            <view class="member" @click.stop>
                <slot></slot>
                <view class="close a-x-center a-y-center" @click="close">
                    <i class="c-iconfont icon-x"></i>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CDialog extends Vue {
    @Prop({ type: Boolean, default: false })
    visible!: boolean;

    close(): void {
        this.$emit("close");
        this.$emit("update:visible", false);
    }
}
</script>

<style scoped lang="scss">
@import "../styles/asse.scss";

@keyframes arise {
    0% {
        opacity: 0;
        visibility: hidden;
    }
    100% {
        opacity: 1;
        visibility: visible;
    }
}
.container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(61, 61, 61, 0.5);
    animation: arise 0.2s;
}
.member {
    position: relative;
    padding: 10px;
    font-size: 13px;
    border-radius: 3px;
    background-color: #ffffff;
}
.close {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -6px;
    right: -6px;
    z-index: 100;
    border-radius: 50%;
    background-color: $a-font-grey;
}
.icon-x {
    color: #ffffff;
    font-size: 10px;
}
</style>
