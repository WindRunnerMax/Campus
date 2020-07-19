"use strict";
import globalData from "@/modules/global-data";
import request from "@/modules/request";
import {toast} from "@/modules/toast";
import {extend} from  "@/modules/copy";
import {PubSub} from "@/modules/event-bus";
import {extDate} from "@/modules/datetime";
import {checkUpdate} from  "@/modules/update";

function disposeApp(app){
    extDate(); //拓展Date原型
    checkUpdate(); // 检查更新
    app.$scope.toast = toast;
    app.$scope.extend = extend;
    app.$scope.eventBus = new PubSub();
    app.$scope.extend(app.$scope, request);
    app.$scope.extend(app.globalData, globalData);
    app.globalData.colorN = app.globalData.colorList.length;
}

/**
 * APP启动事件
 */
function onLaunch() {
    var app = this;
    disposeApp(this);
    // init app data
}


export default {onLaunch, toast}
