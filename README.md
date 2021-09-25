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


之后是天坑环节，在之前发布`npm`包的时候就有很多坑，可以参考上边的博客。这次的坑是，使用按需引入的方式，即类似于`import { CCard } from "shst-campus";`这种形式，如果在本地`src`中写页面使用的是装饰器的写法的话，是不能正常编译`node_modules`里的组件的，无论`node_modules`里的组件是`TS`还是普通`vue`组件都会出现这样的情况，这个问题在上边写的博客里写了这就是个大坑，即编译出来的产物是没有`css`文件以及`js`文件只有一个`Component({})`，如果使用的是`Vue.extend`的写法的话，又是能够正常编译`node_modules`里的组件，当然本地`src`编写的组件如果没有使用`TS`的话是没有问题的，所以现在是有三种解决方案，其实终极大招是写一个`webpack loader`，这个我在博客中实现过，考虑到通用性才最终没使用，要是实在顶不住了就完善一下直接上`loader`，至于为什么要写`loader`而不只是写一个`plugin`也可以看看博客，天坑。
* `src`中组件使用装饰器写法，引入组件使用真实路径，即类似于`import CCard from "shst-campus/lib/c-card/c-card.vue";`。
* `src`中组件使用`Vue.extend`写法，可以使用按需引入，即类似于`import { CCard } from "shst-campus";`。
* `src`中组件使用这两种写法都可以，然后配置一下`uniapp`提供的`easycom`能力，之后可以直接使用组件不需要声明。

如果需要配置组件的按需引入，即类似于`import { CCard } from "shst-campus";`这种形式，需要修改`babel.config.js`文件。
```javascript
// babel.config.js
// ...
process.UNI_LIBRARIES = process.UNI_LIBRARIES || ["@dcloudio/uni-ui"];
process.UNI_LIBRARIES.push("shst-campus");
process.UNI_LIBRARIES.forEach(libraryName => {
    plugins.push([
        "import",
        {
            libraryName: libraryName,
            customName: name => {
                return `${libraryName}/lib/${name}/${name}`;
            },
        },
        libraryName,
    ]);
});
// ...
```

如果需要使用`easycom`的引入形式，那么需要配置`pages.json`。

```javascript
// pages.json
{
    "easycom": {
       "autoscan": true,
       "custom": {
            "^c-(.*)": "shst-campus/lib/c-$1/c-$1.vue"
       }
    },
    // ...
}
```

近来事情不多所以重写了之前提到的`loader`，如果使用按需加载的方式上边都可以忽略，只需要安装好依赖并且在`vue.config.js`中配置好就可以了，可以参考`https://github.com/SHST-SDUST/SHST-UNI/`。

```shell
$ yarn add uniapp-import-loader
```

```javascript
// vue.config.js
const path = require("path");

module.exports = {
    configureWebpack: {
        // ...
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "uniapp-import-loader", 
                    // import { CCard } from "shst-campus"; 
                    // => import CCard from "shst-campus/lib/c-card/c-card";
                    options: {
                        name: "shst-campus",
                        path: "lib",
                    },
                },
            ],
        },
        // ..
    },
};
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
// 此处示例的引入方式是作为`npm`依赖包的引入方式，并非上述示例中的方式，其他组件同此处
import CTimeTableHeader from "shst-campus/lib/c-time-table-header/c-time-table-header.vue";
import CTimeTableBody from "shst-campus/lib/c-time-table-body/c-time-table-body.vue";
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
import CCalendar from "shst-campus/lib/c-calendar/c-calendar.vue";

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
