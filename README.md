# Campus
校园小程序组件库，`uniapp-cli`构建，主要是作为 [山科小站](https://github.com/WindrunnerMax/SHST) 抽离的组件库依赖，请注意安装`ts`和`sass`的依赖，依赖包可以直接参考此版本库根目录下的`package.json`，迁移到`TS`以及处理作为小程序的依赖踩坑等相关信息请参考 (博客编写中...)。

## 安装

安装`shst-campus`依赖。

```shell
$ yarn add shst-campus
```

`uni-cli`项目默认是不编译`node_modules`下的组件的，导致条件编译等功能失效 ，需要在根目录创建`vue.config.js`文件 ，增加`shst-campus`包的编译即可。

```javascript
const path = require("path");

module.exports = {
    transpileDependencies: ["shst-campus"],
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "./src"),
            },
        },
    },
};
```

此外需要安装`sass`以及`sass-loader`，`sass-loader`请使用低于`@11.0.0`的版本，`sass-loader@11.0.0`不支持`vue@2.6.12`，`TS`相关依赖建议可以参考`package.json`，建议在`vue create -p dcloudio/uni-preset-vue`时直接选择`typescript`模板即可。

```shell
$ yarn add sass -D  
$ yarn add sass-loader@10.1.1 -D
```


## 课表组件

### 描述

* 示例: `/pages/time-table/time-table.vue`。

```vue
<template>
    <c-time-table-header
        :week="week"
        @previous="pre"
        @next="next"
        @refresh="refresh"
    ></c-time-table-header>
    <view class="a-hr"></view>
    <c-time-table-body :start="start" :week="week" :table="table"></c-time-table-body>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 此处示例的引入方式是作为`npm`依赖包的引入方式，并非示例中的方式，其他组件同
import { CTimeTableHeader, CTimeTableBody } from "shst-campus";
import { DefinedTableItem } from "shst-campus/lib/types/timetable";

@Component({
    components: { CTimeTableHeader, CTimeTableBody },
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
        console.log("refresh");
    }

    pre(): void {
        console.log("previous");
    }

    next(): void {
        console.log("next");
    }
}
</script>
```

### 参数说明

* `week`: 显示的周次。
* `term-start`: 当前学期开学日期，指的是开学当日。
* `table`: 课表数据，传入一个对象数组，每个对象指定一节课程。
* `@refresh`: 刷新按钮触发事件处理函数。
* `@previous`: 上一周次按钮触发事件处理函数。
* `@next`: 下一周次按钮触发事件处理函数。

## 校历组件

### 描述
* 示例: `/pages/calendar/calendar.vue`  

```vue
<template>
    <view>
        <c-calendar
            :term="term"
            :termStart="termStart"
            :weekCount="weekCount"
            :vacationWeek="vacationWeek"
            :workDay="workDay"
            :vacationDay="vacationDay"
        ></c-calendar>
    </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CCalendar } from "shst-campus";

@Component({
    components: { CCalendar },
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

```

### 参数说明
* `term`: 当前学期。
* `termStart`: 开学日期，指的是开学当天。
* `weekCount`: 该学期总周次，是包括假期在内的周次总数。
* `vacationWeek`: 假期开始周次，一定是小于等于`weekCount`的。
* `workDay`: 调休的工作日，例如`2021-09-18`是周六，中秋假期调休上班。
* `vacationDay`: 假期，例如`2021-09-20`是周一，`2021-09-21`是周二，中秋假期休息。
