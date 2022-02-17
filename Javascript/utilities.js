

var i = 0
pop = ()=>{
    if (i === 0){
        document.getElementById("item1").style.transform = "translateX(-8vh)"
        document.getElementById("item2").style.transform = "translate(-5.5vh,5vh)"
        document.getElementById("item3").style.transform = "translateY(8vh)"
        document.getElementById("item4").style.transform = "translate(5.5vh, 5vh)"
        document.getElementById("item5").style.transform = "translateX(8vh)"
        i = 1
    }
    else{
        document.getElementById("item1").style.transform = "translateX(0)"
        document.getElementById("item2").style.transform = "translate(0)"
        document.getElementById("item3").style.transform = "translateY(0)"
        document.getElementById("item4").style.transform = "translate(0)"
        document.getElementById("item5").style.transform = "translateX(0)"
        i = 0

    }
}


const createGrid=(wrap,cols) =>{
    for(let y=0;y<cols;y++){
        const tp=document.createElement("div")
        tp.setAttribute("class","row ")
        for(let x=0;x<3;x++){
            const col=document.createElement("div")
            col.setAttribute("class","col-md-3")
            col.setAttribute("id","col "+x+" "+y)
            col.style.opacity = 0.2;
            tp.appendChild(col)
        }
        wrap.appendChild(tp)
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
