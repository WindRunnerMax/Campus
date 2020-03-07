const util = require("calendarUtil.js");
const date = new Date();
Component({
  properties: {
    term: {
      type: String,
      value: '2019-2020-2',
    },
    termStart: {
      type: String,
      value: '2020-02-10',
    },
    weekCount: {
      type: Number,
      value: 29
    },
    vacationStart: {
      type: Number,
      value: 24
    }
  },
  data: {
    calendarData: [],
    allowClick: true,
    vacationDateDiff: 0,
    vacationStartDate: "",
    curMonth: util.formatDate("MM", date),
    curYear: util.formatDate("yyyy", date),
    today: util.formatDate(undefined, date)
  },
  created: function () {
    util.extDate();
  },
  ready: function () {
    this.calcVacation();
    this.redayForDate(date);
  },
  methods: {
    jumpDate: function(e){
      var d = new Date(e.currentTarget.dataset.d);
      this.data.curMonth = util.formatDate("MM", d);
      this.data.curYear = util.formatDate("yyyy", d);
      this.redayForDate(d);
      this.setData({
        curMonth: this.data.curMonth,
        curYear: this.data.curYear,
      })
    },
    switchMonth:function(e){
      var d = new Date(this.data.curYear+"-"+this.data.curMonth+"-01");
      var s = e.currentTarget.dataset.s;
      if (s === "l") d.addDate(0,-1);
      else d.addDate(0,1);
      this.data.curMonth = util.formatDate("MM", d);
      this.data.curYear = util.formatDate("yyyy", d);
      this.redayForDate(d);
      this.setData({
        curMonth: this.data.curMonth,
        curYear: this.data.curYear,
      })
    },
    redayForDate: function(date){
      var curMonthDay = util.formatDate("yyyy-MM-01", date);
      var monthStart = new Date(curMonthDay);
      var monthStartWeekDay = monthStart.getDay();
      monthStartWeekDay = monthStartWeekDay === 0 ? 7 : monthStartWeekDay;
      var calendarStart = monthStart;
      calendarStart.addDate(0, 0, -(monthStartWeekDay - 1));
      this.showCalendar(calendarStart);
    },
    showCalendar: function (start) {
      var showArr = [];
      for (let i = 0; i < 6; ++i) {
        let innerArr = [];
        let week = 0;
        for (let k = 0; k < 7; ++k) {
          let unitDate = util.formatDate("yyyy-MM-dd", start);
          if (k === 0) {
            week = parseInt((util.dateDiff(this.data.termStart, unitDate) / 7)) + 1;
            week = week > 0 ? week : 0;
            innerArr.push({ day: week, color: "week ", type: "周次", detach:"" })
          }
          let unitObj = { day: unitDate.split("-")[2], color: "notCurMonth ", type: "--", detach: ""};
          if (util.formatDate("MM", start) === this.data.curMonth) unitObj.color = "curMonth ";
          if (unitDate === this.data.today) unitObj.color = "today ";
          if (unitDate === this.data.termStart) unitObj.color = "termStart ";
          if (unitDate === this.data.vacationStartDate) unitObj.color = "vacationStart ";
          if (k === 5 || k === 6) {
            unitObj.type = "周末";
            unitObj.color += "weekend ";
          } else if (week && week < this.data.weekCount) {
            var tmpColor = "classes ";
            unitObj.type = "教学"; unitObj.detach = "cdetach";
            if (week >= this.data.vacationStart) { unitObj.type = "假期"; tmpColor = "vacation "; unitObj.detach=""; }
            unitObj.color += tmpColor;
          }
          innerArr.push(unitObj);
          start.addDate(0, 0, 1);
        }
        showArr.push(innerArr);
      }
      this.setData({
        calendarData: showArr
      })
    },
    calcVacation: function () {
      var d = new Date(this.data.termStart);
      d.addDate(0, 0, (this.data.vacationStart - 1) * 7);
      var vacationStartDate = util.formatDate(undefined, d);
      this.setData({ 
        vacationStartDate: vacationStartDate,
        vacationDateDiff: util.dateDiff(this.data.today, vacationStartDate)
      })
    }
  }
})