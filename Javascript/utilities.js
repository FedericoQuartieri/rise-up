const createGrid=(cols) =>{
    for(let y=0;y<cols;y++){
        const tp=document.createElement("div")
        tp.setAttribute("class","row")
        for(let x=0;x<3;x++){
            const col=document.createElement("div")
            col.setAttribute("class","col-md-3")
            col.setAttribute("id","col "+x+" "+y)
            tp.appendChild(col)
        }
        document.body.appendChild(tp)
        document.getElementById("col 1 "+y).setAttribute("class","col-md-6")
    } 
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
  
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }
  
var c = 0
var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var curDay = date.getDate();
var curMonth = months[date.getMonth()];
var curYear = date.getFullYear();
world.initial_year = curYear
world.initial_month = date.getMonth()
world.initial_day = curDay
  
  
function following_month (curMonth) {
    let a = months.indexOf(curMonth)
    curMonth = months[a + 1]
    return curMonth
  }
  
function clock (state) {
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
    world.curMonth = curMonth
    world.month_numb = months.indexOf(world.curMonth) + 1
    world.curDay = curDay
    world.curYear = curYear
    const datte = curDay  + curMonth  + curYear
    
    state.world.date=datte
  }
