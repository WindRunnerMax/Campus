<template>
    <CTourSearch :school-map="map"></CTourSearch>
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
}
</script>

<style>
page {
    padding: 0;
}
</style>
