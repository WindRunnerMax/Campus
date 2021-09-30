<template>
    <view>
        <view
            class="a-flex a-text-center a-background-blue tab-container a-lpt a-fontsize-13"
            v-if="!fullScreen"
        >
            <view
                v-for="(item, index) in schoolMap"
                :key="index"
                @click="switchTab(index)"
                class="a-flex-full tab-item"
                :class="{ 'tab-active': activeTab === index }"
            >
                {{ item.name }}
            </view>
        </view>
        <map
            class="map-container"
            :longitude="location.longitude"
            :latitude="location.latitude"
            :markers="schoolMap[activeTab].data"
            @markertap="markerTap"
            :include-points="schoolMap[activeTab].data"
            show-location
            enable-overlooking
            enable-3D
            show-compass
            :style="{ width: 'auto', height: fullScreen ? 93 + 'vh' : 50 + 'vh' }"
        >
            <view class="map-buttons" :class="{ fullScreen }">
                <view @click="$emit('nav-search')">
                    <view class="c-iconfont icon-search" />
                </view>
                <view @click="locateCurrentPosition" class="a-lmt">
                    <view class="c-iconfont icon-location" />
                </view>
            </view>
        </map>
        <view
            @click="fullScreen = !fullScreen"
            class="a-text-center a-background-grey a-fontsize-13 a-pt a-pb"
        >
            共有{{ schoolMap[activeTab].data.length }}个景观 ◕‿◕
        </view>
        <scroll-view
            scroll-y
            :style="{ height: fullScreen ? 0 : 40 + 'vh' }"
            :scroll-top="selectedBuildId * 70"
        >
            <view
                v-for="(item, index) in schoolMap[activeTab].data"
                :key="index"
                class="a-y-center building-item a-color-grey a-flex-space-between"
                :style="{ 'background-color': selectedBuildId == index ? '#d5d5d5' : '' }"
            >
                <view
                    @click="$emit('nav-detail', '?tid=' + activeTab + '&bid=' + index)"
                    class="a-y-center"
                >
                    <image
                        :src="item.img[0]"
                        mode="aspectFill"
                        class="building-image a-lmr"
                    ></image>
                    <view class="item">
                        <view class="item-name">{{ item.name }}</view>
                    </view>
                </view>
                <view
                    @click="
                        $emit(
                            'nav-route',
                            '?latitude=' + item.latitude + '&longitude=' + item.longitude
                        )
                    "
                >
                    <view class="c-iconfont icon-location"></view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TourConfig, MarkerImages, InitLocation } from "../types/tour";

@Component
export default class CTour extends Vue {
    @Prop({ required: true, type: Array })
    public config!: TourConfig;
    @Prop({ required: true, type: Object })
    public images!: MarkerImages;
    @Prop({ required: true, type: Object })
    public initLocation!: InitLocation;

    public fullScreen: boolean = false;
    public location: InitLocation = {
        latitude: 36.006,
        longitude: 120.12187,
    };
    public activeTab = 0;
    public selectedBuildId = -1;
    public schoolMap: TourConfig = this.buildSchoolMap();

    public created() {
        this.location = this.initLocation;
        uni.showShareMenu({ withShareTicket: true });
    }

    private buildSchoolMap(): TourConfig {
        return this.config.map(tabItem => ({
            ...tabItem,
            data: tabItem.data.map((dataItem, dataIndex) => ({
                ...dataItem,
                id: dataIndex,
                width: dataItem.width ? dataItem.width : 30,
                height: dataItem.height ? dataItem.height : 30,
                iconPath: dataItem.iconPath ? dataItem.iconPath : this.images[dataItem.icon],
            })),
        }));
    }

    public switchTab(index: number): void {
        this.activeTab = index;
        this.selectedBuildId = -1;
        this.location = this.initLocation;
    }

    public markerTap(e: { markerId: number }) {
        this.selectedBuildId = e.markerId;
    }

    public locateCurrentPosition(): void {
        uni.getLocation({
            type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 uni.openLocation 的坐标
            success: res => {
                this.location = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                };
            },
        });
    }

    public onShareAppMessage() {}
}
</script>

<style lang="scss">
@import "../styles/asse.scss";

.tab-container {
    height: 40px;
}
.tab-item {
    height: 30px;
    color: #fff;
    font-size: 26rpx;
}

.tab-active {
    border-bottom: 3px solid white;
}

.building-image {
    width: 80px;
    height: 50px;
}

.building-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.map-container {
    position: relative;
}

.map-buttons {
    position: absolute;
    top: 65%;
    left: 86%;
}

.icon-search,
.icon-location {
    font-size: 20px;
    padding: 13px;
    border-radius: 50px;
    background: $a-blue;
    color: #fff;
}
</style>
