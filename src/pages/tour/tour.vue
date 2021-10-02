<template>
    <CTour
        :school-map="map"
        :images="imagesPath"
        :init-location="initLocation"
        @nav-search="navSearch"
        @nav-detail="navDetail"
        @nav-route="navRoute"
    ></CTour>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import map from "./sdust";
import CTour from "@/components/c-tour/c-tour.vue";
import { TourConfig, MarkerImages, InitLocation } from "@/components/types/tour";

@Component({
    components: { CTour },
})
export default class Tour extends Vue {
    public map: TourConfig = map;
    public imagesPath: MarkerImages = {
        life: "/static/tour/life.png",
        dormitory: "/static/tour/dormitory.png",
        scenery: "/static/tour/scenery.png",
        canteen: "/static/tour/canteen.png",
        door: "/static/tour/door.png",
        building: "/static/tour/building.png",
        supermarket: "/static/tour/supermarket.png",
    };
    public initLocation: InitLocation = {
        latitude: 36.003,
        longitude: 120.1239,
    };

    public navSearch(): void {
        uni.navigateTo({ url: "./search" });
    }

    public navDetail(path: string): void {
        uni.navigateTo({ url: "./detail" + path });
    }

    public navRoute(path: string): void {
        uni.navigateTo({ url: "./route" + path });
    }
}
</script>

<style>
page {
    padding: 0;
}
</style>
