<template>
    <view>
        <map
            :longitude="location.longitude"
            :latitude="location.latitude"
            scale="14"
            :markers="markers"
            :polyline="polyLines"
            :include-points="markers"
            class="route-map"
            show-location
            enable-overlooking="true"
            enable-3D="true"
            show-compass
        >
            <view class="distance a-color-white a-background-blue">{{ distance }}</view>
        </map>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { RouteMarkerImages } from "../types/tour";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AMap: any = require("../sdk/amap-wx");

interface Location {
    latitude: number;
    longitude: number;
}

@Component
export default class CTourRoute extends Vue {
    @Prop({ required: true, type: Object })
    public images!: RouteMarkerImages;
    @Prop({ required: true, type: String })
    public mapKey!: string;
    @Prop({ required: true, type: Object })
    public targetLocation!: Location;

    public location: Location = {
        latitude: 0,
        longitude: 0,
    };

    public markers: Array<{
        id: number;
        width: string;
        height: string;
        iconPath: string;
        latitude: number;
        longitude: number;
    }> = [];

    public distance = "loading...";

    public polyLines: Array<{
        points: Array<Location>;
        color: string;
        width: number;
    }> = [];

    @Watch("targetLocation")
    onTargetLocation(): void {
        if (this.location.latitude && this.location.longitude) {
            this.routing(this.targetLocation);
        }
    }

    public created(): void {
        uni.getLocation({
            type: "wgs84",
            success: res => {
                this.location.latitude = res.latitude;
                this.location.longitude = res.longitude;
                if (this.targetLocation.latitude && this.targetLocation.longitude) {
                    this.routing(this.targetLocation);
                }
            },
            fail: () => {
                uni.showToast({
                    title: "定位失败，无法完成路径规划，请检查定位功能是否开启或小程序定位是否授权",
                });
            },
        });
    }

    private routing(location: Location): void {
        const distance =
            Math.abs(this.location.longitude - location.longitude) +
            Math.abs(this.location.latitude - location.latitude);
        const routing: any = new AMap.AMapWX({ key: this.mapKey });
        const routeingConfig = {
            origin: this.location.longitude + "," + this.location.latitude,
            destination: location.longitude + "," + location.latitude,
            success: (data: {
                paths: Array<{ distance: string; steps: Array<{ polyline: string }> }>;
            }) => {
                const points: Array<Location> = [];
                if (data.paths && data.paths[0] && data.paths[0].steps) {
                    const steps = data.paths[0].steps;
                    for (let i = 0; i < steps.length; i++) {
                        const locations = steps[i].polyline.split(";");
                        for (let j = 0; j < locations.length; j++) {
                            points.push({
                                longitude: parseFloat(locations[j].split(",")[0]),
                                latitude: parseFloat(locations[j].split(",")[1]),
                            });
                        }
                    }
                }
                this.markers = [
                    {
                        id: 1,
                        width: "30",
                        height: "30",
                        iconPath: this.images.end,
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                    {
                        id: 2,
                        width: "30",
                        height: "30",
                        iconPath: this.images.start,
                        latitude: this.location.latitude,
                        longitude: this.location.longitude,
                    },
                ];
                this.polyLines = [
                    {
                        points: points,
                        color: "#4C98F7",
                        width: 6,
                    },
                ];
                if (data.paths[0] && data.paths[0].distance) {
                    this.distance = data.paths[0].distance + "米";
                }
            },
            fail: () => {
                uni.showToast({
                    title: "路径规划失败",
                });
            },
        };
        console.log(routeingConfig);
        if (distance < 0.8) {
            // getWalkingRoute 步行
            routing.getWalkingRoute(routeingConfig);
        } else {
            // getDrivingRoute 驾车
            routing.getDrivingRoute(routeingConfig);
        }
    }
}
</script>

<style>
.route-map {
    width: auto;
    height: 100vh;
}

.distance {
    position: absolute;
    bottom: 30px;
    right: 10px;
    height: 30px;
    line-height: 30px;
    padding: 3px 5px;
    border-radius: 5px;
}
</style>
