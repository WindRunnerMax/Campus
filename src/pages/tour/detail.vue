<template>
    <CTourDetail :detail="detail" @nav-route="navRoute"></CTourDetail>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import map from "./sdust";
import CTourDetail from "@/components/c-tour-detail/c-tour-detail.vue";
import { SubItem } from "@/components/types/tour";

@Component({
    components: { CTourDetail },
})
export default class Detail extends Vue {
    public detail: SubItem | Record<string, never> = {};

    onLoad(options: { tIndex: string; dIndex: string }): void {
        const tabIndex = Number(options.tIndex);
        const dataIndex = Number(options.dIndex);
        this.detail = map[tabIndex].data[dataIndex];
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
