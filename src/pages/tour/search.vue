<template>
    <CTourSearch :school-map="map" @nav-detail="navDetail" @nav-route="navRoute"></CTourSearch>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import map from "./sdust";
import CTourSearch from "@/components/c-tour-search/c-tour-search.vue";
import { TourConfig } from "@/components/types/tour";

@Component({
    components: { CTourSearch },
})
export default class Tour extends Vue {
    public map: TourConfig = map;

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
