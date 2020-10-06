# Campus
校园小程序组件库，使用`uniapp`开发，导入`HbuildX`即可查看示例，使用时请注意将`components`目录下相关文件复制，其中使用了模块化方案以及公共组件和样式等。

## 课表组件

### 描述

* 示例: `/pages/study/time-table/time-table.vue`  
* 组件: `/components/time-table/time-table.vue`

```html
<time-table
    :week="23"
    term-start="2020-02-10"
    :table="table"
    @refresh="refresh"
    @pre="pre"
    @next="next">
</time-table>
```

### 参数说明

* `week`: 当前周次。
* `term-start`: 当前学期开学日期，指的是开学当日。
* `table`: 课表数据，传入一个对象数组，每个对象指定一节课程。
* `@refresh`: 刷新按钮触发事件处理函数。
* `@pre`: 上一周次按钮触发事件处理函数。
* `@next`: 下一周次按钮触发事件处理函数。

## 校历组件

### 描述
* 示例: `/pages/life/calendar/calendar.vue`  
* 组件: `/components/calendar/calendar.vue`

```html
<calendar
    term="2019-2020-2"
    termStart="2020-02-10"
    weekCount="29"
    vacationStart="24">
</calendar>
```

### 参数说明
* `term`: 当前学期。
* `termStart`: 开学日期。
* `weekCount`: 该学期总周次。
* `vacationStart`: 假期开始周次。