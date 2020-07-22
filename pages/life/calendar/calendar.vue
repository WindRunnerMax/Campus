<template>
	<view>

        <calendar
            term="2019-2020-2"
            termStart="2020-02-10"
            weekCount="29"
            vacationStart="24">
        </calendar>

	</view>
</template>

<script>
    import calendar from "@/components/calendar/calendar.vue";
    export default {
        components:{
            calendar
        },
		data: function() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
