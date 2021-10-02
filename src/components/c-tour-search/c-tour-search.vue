<template>
    <view>
        <view class="a-y-center search-container">
            <icon class="a-ml a-mr-6" type="search" size="16" color="blue" />
            <input
                class="a-flex-full"
                :value="searchText"
                placeholder="请输入景点名称关键词"
                @input="bindInputText"
            />
            <icon class="a-ml a-mr" type="cancel" size="16" color="purple" @click="reset" />
        </view>
        <view
            v-for="(item, index) in result"
            :key="index"
            class="a-y-center building-item a-color-grey a-flex-space-between"
            @click="$emit('nav-detail', '?tIndex=' + item.tabIndex + '&dIndex=' + item.dataIndex)"
        >
            <view class="a-y-center">
                <image :src="item.img[0]" mode="aspectFill" class="building-image a-lmr"></image>
                <view class="item">
                    <view class="item-name">{{ item.name }}</view>
                </view>
            </view>
            <view
                @click.stop="
                    $emit(
                        'nav-route',
                        '?latitude=' + item.latitude + '&longitude=' + item.longitude
                    )
                "
            >
                <view class="c-iconfont icon-location"></view>
            </view>
        </view>
        <view v-if="searchText && result.length === 0" class="a-text-center a-color-grey">
            啊哦~ 什么都没有找到
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TourConfig, SubItem } from "../types/tour";
import { debounce } from "../utils/operate-limit";

type ExtendSubItem = SubItem & { tabIndex: number; dataIndex: number };

@Component
export default class CTourSearch extends Vue {
    @Prop({ required: true, type: Array })
    public schoolMap!: TourConfig;

    public result: Array<ExtendSubItem> = [];
    public searchText = "";

    bindInputText(event: { detail: { value: string } }): void {
        debounce(500, () => {
            const tmpResult: Array<ExtendSubItem> = [];
            this.searchText = event.detail.value;
            const tmpSearchText: string = this.searchText.trim().toUpperCase();
            if (!tmpSearchText) return void 0;
            this.schoolMap.forEach((tabItem, tabIndex) => {
                tabItem.data.forEach((dataItem, dataIndex) => {
                    if (
                        dataItem.name.indexOf(tmpSearchText) > -1 ||
                        dataItem.description.indexOf(tmpSearchText) > -1
                    ) {
                        tmpResult.push({ ...dataItem, tabIndex, dataIndex });
                    }
                });
            });
            this.result = tmpResult;
        });
    }

    public reset(): void {
        this.searchText = "";
        this.result = [];
    }
}
</script>

<style lang="scss">
@import "../styles/asse.scss";

.search-container {
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 20px;
    padding: 5px;
}
.building-image {
    width: 80px;
    height: 50px;
}

.building-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.icon-location {
    font-size: 20px;
    padding: 13px;
    border-radius: 50px;
    background: $a-blue;
    color: #fff;
}
</style>
