<template>
    <CTour :config="map" :images="imagesPath" :init-location="initLocation"></CTour>
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
}
</script>

<style>
page {
    padding: 0;
}
</style>
