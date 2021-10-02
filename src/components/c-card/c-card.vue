<template>
    <view>
        <view
            class="c-title-container"
            :style="{ height: titleHeight ? titleHeight + 'px' : 'auto' }"
            v-show="title"
        >
            <view class="c-left-con">
                <view class="c-dot" :style="{ background: color }"></view>
                <view class="c-title">{{ title }}</view>
            </view>
            <view>
                <slot name="head"></slot>
            </view>
        </view>
        <view class="c-card" :style="{ color: cardColor }" :class="{ 'c-min-top': showTopSpace }">
            <slot></slot>
        </view>
    </view>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CCard extends Vue {
    @Prop({ type: String })
    title!: string;
    @Prop({ type: String, default: "#79B2F9" })
    color!: string;
    @Prop({ type: Boolean, default: null })
    topSpace!: boolean;
    @Prop({ type: Boolean, default: false })
    inheritColor!: boolean;
    @Prop({ type: [String, Number], default: "" })
    titleHeight!: string | number;

    get cardColor(): string {
        return this.inheritColor ? this.color : "unset";
    }

    get showTopSpace(): boolean {
        return this.topSpace === null ? !!this.title : !this.topSpace;
    }
}
</script>
<style>
.c-title-container {
    background-color: #ffffff;
    padding: 10px 5px 8px 5px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
    align-items: center;
}

.c-dot {
    width: 2px;
    margin: 2px 5px;
}

.c-card {
    font-size: 13px;
    background-color: #ffffff;
    padding: 11px;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.c-title {
    font-size: 14px;
    align-self: center;
}

.c-min-top {
    padding-top: 3px;
}

.c-left-con {
    display: flex;
}
</style>
