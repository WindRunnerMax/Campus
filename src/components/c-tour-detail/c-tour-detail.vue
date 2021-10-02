<template>
    <view>
        <view>
            <swiper
                class="swiper a-x-full"
                :indicator-dots="true"
                indicator-active-color="#fff"
                autoplay="1"
                interval="3000"
                duration="500"
            >
                <view v-for="(item, index) in detail.img" :key="index">
                    <swiper-item>
                        <image class="a-x-full a-y-full" :src="item"></image>
                    </swiper-item>
                </view>
            </swiper>
            <view class="a-y-center a-flex-space-between a-mt-15 a-lpl a-lpr">
                <view class="a-fontsize-26 a-color-blue">{{ detail.name }}</view>
                <view
                    @click="
                        $emit(
                            'nav-route',
                            '?latitude=' + detail.latitude + '&longitude=' + detail.longitude
                        )
                    "
                >
                    <view class="c-iconfont icon-location"></view>
                </view>
            </view>
            <view class="a-color-grey a-mt-15 a-lpl a-lpr">
                <rich-text :nodes="detail.description"></rich-text>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { SubItem } from "../types/tour";

@Component
export default class CTourDetail extends Vue {
    @Prop({ required: true, type: Object })
    public detail!: SubItem;
}
</script>

<style lang="scss">
@import "../styles/asse.scss";

.swiper {
    height: 40vh;
}
.icon-location {
    font-size: 20px;
    padding: 13px;
    border-radius: 50px;
    background: $a-blue;
    color: #fff;
}
</style>
