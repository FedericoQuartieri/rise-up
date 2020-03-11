const states = {
    "italia" : 
                {
                    "posti_letto" : 150000,
                    "posti_letto_rianimazione" : 5000,
                    "PIL" : 1935000000000,
                    "percentuale_pil_sanita": 6.5
                }
}


var World = function(countries_n,popolation){
    this.countries_n=countries_n;
    this.popolation=popolation;
    this.infects=1;
    this.infection_rate=0;
    this.countries=[];//poi in base a countries_n popoli il mondo con tot paesi
    console.log("created new world !")
    this.assign = function(){
        //questa è la funzione che fa scegliere il paese o comunque che dice qual è quello selezionato
    }


    this.increase = function (n){
        this.infection_rate+=n;
    } 
    this.infect = function(){
        this.infects += this.infects*(this.infection_rate/100)
        this.infects = Math.round(this.infects)  //bisogna come arrotondare, così è al meglio però boh
    }
    this.print = function(){
        console.log("infected : " ,this.infects)
        console.log("rate : " ,this.infection_rate)
        
    }
}
w1 = new World

var timer = 0

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()]; // get day
var curDay = date.getDate();  // get date
var curMonth = months[date.getMonth()]; // get month
var curYear = date.getFullYear(); // get year
w1= new World

var timer = 0

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()]; // get day
var curDay = date.getDate();  // get date
var curMonth = months[date.getMonth()]; // get month
var curYear = date.getFullYear(); // get year


function following_month (curMonth) {
    a = months.indexOf(curMonth)
    curMonth = months[a+1]
    return curMonth
}

function clock (timer) {
    const _30_month = ['April', 'June', 'September', 'November'];
    const _31_month = ['January', 'March',  'May',  'July', 'August', 'October', 'December'];
    if (curMonth === "December" && curDay === 31) {curYear += 1}
    else {
        if (curDay >= 29) {
            if (curMonth === "February" && curDay === 29 ) {
                curMonth = following_month(curMonth)
                curDay = 1
            }
            else if (curDay === 30 && _30_month.includes(curMonth)) {
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
    date = curDay + curMonth + curYear
    return date
}

while (true) {
    timer += 1
    sleep(100);
    date = clock(timer)
    console.log(date)
}

