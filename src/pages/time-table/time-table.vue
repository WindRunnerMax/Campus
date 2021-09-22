<template>
    <view>
        <c-card title="课表">
            <c-time-table-header
                :week="week"
                @previous="pre"
                @next="next"
                @refresh="refresh"
            ></c-time-table-header>
            <view class="a-hr"></view>
            <c-time-table-body :start="start" :week="week" :table="table"></c-time-table-body>
        </c-card>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CCard from "@/components/c-card/c-card.vue";
import CTimeTableHeader from "@/components/c-time-table-header/c-time-table-header.vue";
import CTimeTableBody from "@/components/c-time-table-body/c-time-table-body.vue";
import { DefinedTableItem } from "@/components/types/time-table";

@Component({
    components: { CTimeTableHeader, CTimeTableBody, CCard },
})
export default class TimeTable extends Vue {
    week: number = 3;
    start: string = "2021-08-30";
    table: Array<DefinedTableItem> = [
        { week: 1, serial: 1, className: "高等数学1-2", teacher: "测试1", classRoom: "J7-101" },
        { week: 2, serial: 3, className: "高等数学1-2", teacher: "测试2", classRoom: "J7-101" },
        { week: 1, serial: 5, className: "高等数学1-2", teacher: "测试3", classRoom: "J7-101" },
        { week: 1, serial: 3, className: "大学英语1-1", teacher: "测试4", classRoom: "J7-101" },
        { week: 3, serial: 3, className: "大学英语1-1", teacher: "测试5", classRoom: "J7-101" },
        { week: 3, serial: 3, className: "大学英语1-2", teacher: "测试6", classRoom: "J7-102" },
        { week: 3, serial: 4, className: "大学英语1-1", teacher: "测试7", classRoom: "J7-101" },
        { week: 2, serial: 2, className: "大学物理3-2", teacher: "测试8", classRoom: "J7-101" },
        { week: 5, serial: 1, className: "大学物理3-2", teacher: "测试9", classRoom: "J7-101" },
        { week: 5, serial: 3, className: "大学物理3-2", teacher: "测试0", classRoom: "J7-101" },
    ];

    refresh(): void {
        this.table = [
            { week: 1, serial: 1, className: "高等数学1-2", teacher: "测试1", classRoom: "J7-101" },
            { week: 2, serial: 3, className: "高等数学1-2", teacher: "测试2", classRoom: "J7-101" },
            { week: 1, serial: 5, className: "高等数学1-2", teacher: "测试3", classRoom: "J7-101" },
            { week: 1, serial: 3, className: "大学英语1-1", teacher: "测试4", classRoom: "J7-101" },
            { week: 3, serial: 3, className: "大学英语1-1", teacher: "测试5", classRoom: "J7-101" },
            { week: 3, serial: 3, className: "大学英语1-2", teacher: "测试6", classRoom: "J7-102" },
            { week: 3, serial: 4, className: "大学英语1-1", teacher: "测试7", classRoom: "J7-101" },
            { week: 2, serial: 2, className: "大学物理3-2", teacher: "测试8", classRoom: "J7-101" },
            { week: 5, serial: 1, className: "大学物理3-2", teacher: "测试9", classRoom: "J7-101" },
            { week: 5, serial: 3, className: "大学物理3-2", teacher: "测试0", classRoom: "J7-101" },
        ];
    }

    pre(): void {
        if (this.week <= 1) return;
        this.week--;
    }

    next(): void {
        // 模拟一下切换课表数据变动的情况
        if (Math.random() * 10 > 7) {
            this.table.push({
                week: 6,
                serial: 3,
                className: "计算机基础",
                teacher: "测试11",
                classRoom: "J7-101",
            });
        }
        this.week++;
    }
}
</script>
