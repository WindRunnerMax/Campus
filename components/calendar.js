const util = require("calendarUtil.js");

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    calendarStart: null,
    calendarEnd: null,
    calendarData: [],
    allowClick: true,
    today: util.formatDate(),
    curMonth: util.formatDate("MM"),
    curYear: util.formatDate("yyyy")
  },
  created:function(){
    util.extDate();
  },
  ready:function(){
    var date = new Date();
    var curMonthDay = util.formatDate("yyyy-MM-01",date);
    var monthStart = new Date(curMonthDay);
    var monthStartWeekDay = monthStart.getDay();
    var calendarStart = monthStart;
    calendarStart.addDate(0, 0, -monthStartWeekDay);
    this.showCalendar(calendarStart);
  },
  methods: {
    showCalendar: function(start,i=0){
      var showArr = [];
      while((i++) < 42){
        let unitDate = util.formatDate("yyyy-MM-dd",start);
        let unitObj = { day: unitDate , color: "notCurMonth"};
        if (unitDate === this.data.today) unitObj.color = "today";
        if (util.formatDate("MM",start) === this.data.curMonth) unitObj.color="curMonth";
        showArr.push(unitObj);
        if (i === 1) { this.data.calendarStart = unitDate; }
        if (i === 42) { this.data.calendarEnd = unitDate;break; }
        start.addDate(0, 0, 1);
      }
      console.log(showArr);
    }
  }
})