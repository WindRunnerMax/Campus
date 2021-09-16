<template>
    <view>
        <c-card title="课表">
            <c-time-table-header :week="10"></c-time-table-header>
            <c-time-table-body :start="start" :week="week" :table="table"></c-time-table-body>
        </c-card>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CCard from "@/components/card/card.vue";
import CTimeTableHeader from "@/components/time-table/time-table-header.vue";
import CTimeTableBody from "@/components/time-table/time-table-body.vue";
import { DefinedTableItem } from "@/components/time-table/types";

@Component({
    components: { CTimeTableHeader, CTimeTableBody, CCard },
})
export default class TimeTable extends Vue {
    week: number = 3;
    start: string = "2021-08-30";
    table: Array<DefinedTableItem> = [
        { week: 1, serial: 1, className: "高等数学1-2", teacher: "测试", classRoom: "J7-101" },
        { week: 2, serial: 3, className: "高等数学1-2", teacher: "测试", classRoom: "J7-101" },
        { week: 1, serial: 5, className: "高等数学1-2", teacher: "测试", classRoom: "J7-101" },
        { week: 1, serial: 3, className: "大学英语1-1", teacher: "测试", classRoom: "J7-101" },
        { week: 3, serial: 3, className: "大学英语1-1", teacher: "测试", classRoom: "J7-101" },
        { week: 3, serial: 3, className: "大学英语1-2", teacher: "测试", classRoom: "J7-102" },
        { week: 3, serial: 4, className: "大学英语1-1", teacher: "测试", classRoom: "J7-101" },
        { week: 2, serial: 2, className: "大学物理3-2", teacher: "测试", classRoom: "J7-101" },
        { week: 5, serial: 1, className: "大学物理3-2", teacher: "测试", classRoom: "J7-101" },
        { week: 5, serial: 3, className: "大学物理3-2", teacher: "测试", classRoom: "J7-101" },
    ];
}
</script>
