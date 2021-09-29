<template>
    <view>
        <view>
            <scroll-view scroll-x="true">
                <view class="top-switch a-text-center" v-if="!fullScreen">
                    <label
                        v-for="(item, index) in buildData"
                        :key="index"
                        :id="index"
                        @click="changePage"
                        class="top-switch-btn a-x-full"
                        :class="{ 'active': isSelectedBuildType === index }"
                    >
                        {{ item.name }}
                    </label>
                </view>
            </scroll-view>
            <map
                :longitude="longitude"
                :latitude="latitude"
                :scale="buildData[isSelectedBuildType].scale"
                :markers="buildData[isSelectedBuildType].data"
                @markertap="markerTap"
                :include-points="buildData[isSelectedBuildType].data"
                show-location
                enable-overlooking
                enable-3D
                :style="{ width: 'auto', height: fullScreen ? 94 + 'vh' : 48 + 'vh' }"
            >
                <cover-view class="controls" :class="{ full: fullScreen }">
                    <cover-view @click="navigateSearch">
                        <cover-image class="img" src="/static/camptour/search.png" />
                    </cover-view>
                    <cover-view @click="location">
                        <cover-image class="img" src="/static/camptour/location.png" />
                    </cover-view>
                </cover-view>
            </map>
            <view @click="clickButton">
                共有{{ buildData[isSelectedBuildType].data.length }}个景观 ◕‿◕
            </view>
            <scroll-view
                scroll-y
                :style="{ height: fullScreen ? 0 : 40 + 'vh' }"
                :scroll-top="(isSelectedBuild - 1) * 70"
            >
                <view
                    v-for="(item, index) in buildData[isSelectedBuildType].data"
                    :key="index"
                    class="building-item"
                    :style="{ 'background-color': isSelectedBuild - 1 == index ? '#d5d5d5' : '' }"
                >
                    <view class="img-view">
                        <navigator
                            class="img"
                            :url="'details?tid=' + isSelectedBuildType + '&bid=' + index"
                        >
                            <image :src="item.img[0]" mode="aspectFill"></image>
                            <view class="item">
                                <view class="item-name">{{ item.name }}</view>
                                <view class="item-floor" v-if="item.floor">
                                    位置：{{ item.floor }}
                                </view>
                            </view>
                        </navigator>
                        <navigator
                            class="text"
                            :url="
                                'polyline?latitude=' +
                                item.latitude +
                                '&longitude=' +
                                item.longitude
                            "
                        >
                            <image src="/static/camptour/location.svg"></image>
                        </navigator>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import school from "@/vector/resources/camptour/sdust";
export default {
    data: () => ({
        fullScreen: false,
        latitude: 35.9994,
        longitude: 120.12487,
        buildData: {},
        windowHeight: "",
        windowWidth: "",
        isSelectedBuild: 0,
        isSelectedBuildType: 0,
    }),
    created: function () {
        uni.showShareMenu({ withShareTicket: true });
        uni.getSystemInfo({
            success: res => {
                //获取当前设备宽度与高度，用于定位控键的位置
                this.windowHeight = res.windowHeight;
                this.windowWidth = res.windowWidth;
            },
        });
        this.loadSchoolConf();
        this.buildData = uni.$app.data.tmp.map;
        this.location();
    },
    destroyed: function () {
        uni.$app.data.tmp.map = null;
    },
    methods: {
        loadSchoolConf: function () {
            uni.$app.data.tmp.map = school.map;
            for (let i = 0; i < uni.$app.data.tmp.map.length; i++) {
                for (let b = 0; b < uni.$app.data.tmp.map[i].data.length; b++) {
                    uni.$app.data.tmp.map[i].data[b].id = b + 1;
                }
            }
        },
        regionchange: function () {},
        markerTap: function (e) {
            this.isSelectedBuild = e.markerId;
        },
        navigateSearch: function () {
            uni.navigateTo({ url: "search" });
        },
        location: function () {
            uni.getLocation({
                type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 uni.openLocation 的坐标
                success: res => {
                    uni.$app.data.tmp.latitude = res.latitude;
                    uni.$app.data.tmp.longitude = res.longitude;
                    uni.$app.data.tmp.islocation = true;
                    this.longitude = res.longitude;
                    this.latitude = res.latitude;
                },
            });
        },
        clickButton: function () {
            this.fullScreen = !this.fullScreen;
        },
        changePage: function (event) {
            this.isSelectedBuildType = event.currentTarget.id;
            this.isSelectedBuild = 0;
        },
        onShareAppMessage: function () {},
    },
};
</script>

<style></style>
