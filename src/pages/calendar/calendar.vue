<template>
    <view>
        <c-card title="校历">
            <c-calendar
                :term="term"
                :termStart="termStart"
                :weekCount="weekCount"
                :vacationWeek="vacationWeek"
                :workDay="workDay"
                :vacationDay="vacationDay"
            ></c-calendar>
        </c-card>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CCard from "@/components/c-card/c-card.vue";
import CCalendar from "@/components/c-calendar/c-calendar.vue";

@Component({
    components: { CCard, CCalendar },
})
export default class Calendar extends Vue {
    term: string = "2021-2022-1";
    termStart: string = "2021-08-30";
    weekCount: number = 26;
    vacationWeek: number = 21;
    workDay: Array<string> = ["2021-09-18", "2021-09-26"];
    vacationDay: Array<string> = ["2021-09-20", "2021-09-21"];
}
</script>
