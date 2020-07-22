<template>
	<view>
            <time-table
                :week="23"
                term-start="2020-02-10"
                :table="table"
                @refresh="refresh"
                @pre="pre"
                @next="next">
            </time-table>
	</view>
</template>

<script>
    import timeTable from "@/components/time-table/time-table.vue";
	export default {
        components:{
            timeTable
        },
		data: function() {
			return {
                table: [
                    {week: 1, serial: 1, name: "高等数学1-2", teacher: "测试", loc: "J7-101"},
                    {week: 2, serial: 3, name: "高等数学1-2", teacher: "测试", loc: "J7-101"},
                    {week: 1, serial: 5, name: "高等数学1-2", teacher: "测试", loc: "J7-101"},
                    {week: 1, serial: 3, name: "大学英语1-1", teacher: "测试", loc: "J7-101"},
                    {week: 3, serial: 3, name: "大学英语1-1", teacher: "测试", loc: "J7-101"},
                    {week: 3, serial: 4, name: "大学英语1-1", teacher: "测试", loc: "J7-101"},
                    {week: 2, serial: 2, name: "大学物理3-2", teacher: "测试", loc: "J7-101"},
                    {week: 5, serial: 1, name: "大学物理3-2", teacher: "测试", loc: "J7-101"},
                    {week: 5, serial: 3, name: "大学物理3-2", teacher: "测试", loc: "J7-101"},
                ]
			}
		},
		methods: {
            refresh: function(week){
                console.log(`刷新第${week}周课表`);
            },
            pre: function(week){
                console.log(`加载第${--week}周课表`);
            },
            next: function(week){
                console.log(`加载第${++week}周课表`);
            },
		}
	}
</script>

<style>

</style>
