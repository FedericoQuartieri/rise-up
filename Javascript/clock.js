function sleep(miliseconds) {
    var currentTime = new Date().getTime();
  
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }
  
var c = 0
var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
var curDay = date.getDate();
var curMonth = months[date.getMonth()];
var curYear = date.getFullYear();
  
  
function following_month (curMonth) {
    let a = months.indexOf(curMonth)
    curMonth = months[a + 1]
    return curMonth
  }
  
function clock () {
    const _30_month = ['April', 'June', 'September', 'November'];
    const _31_month = ['January', 'March',  'May',  'July', 'August', 'October', 'December'];
    if (curMonth === "December" && curDay === 31) {
        curYear += 1
        curMonth = "January"
        curDay = 1
    }
    else {
        if (curDay >= 29) {
            if (curMonth === "February" && curDay === 29 ) {
                curMonth = following_month(curMonth)
                curDay = 1
            }
            else if ( curDay === 30 && _30_month.includes(curMonth)) {
                curMonth = following_month(curMonth)
                curDay = 1
            }
            else if (curDay === 31 && _31_month.includes(curMonth)) {
               curMonth = following_month(curMonth)
               curDay = 1
  
            }
            else {curDay += 1}
        }
        else {curDay += 1}
    }
    const datte = curDay +curMonth + curYear
    
    console.log(datte)
  }
//------------------------------
