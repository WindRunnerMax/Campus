<template>
    <CTourRoute
        map-key="填入高德地图开放平台申请的key"
        :images="imagesPath"
        :target-location="targetLocation"
    ></CTourRoute>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CTourRoute from "@/components/c-tour-route/c-tour-route.vue";
import { RouteMarkerImages } from "@/components/types/tour";

@Component({
    components: { CTourRoute },
})
export default class Route extends Vue {
    public imagesPath: RouteMarkerImages = {
        start: "/static/tour/start.png",
        end: "/static/tour/end.png",
    };

    public targetLocation: { latitude: number; longitude: number } | Record<string, never> = {};

    onLoad(options: { latitude: string; longitude: string }): void {
        this.targetLocation = {
            latitude: Number(options.latitude),
            longitude: Number(options.longitude),
        };
    }
}
</script>

<style>
page {
    padding: 0;
}
</style>
