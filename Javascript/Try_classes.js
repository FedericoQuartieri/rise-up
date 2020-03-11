const states = {
    "italia" :
                {
                    "beds" : 150000,
                    "reanimate_beds" : 5000,
                    "pil" : 1935000000000,
                    "percentuale_pil_sanita": 6.5,
                    "popolation" : 60000000,
                    "public_debt" : 384738,
                    "money" : 483748374837483748

                }
}


var World = function(state){
  this.infects = 1;
  this.infection_rate = 0;
  this.death_rate=0;
  this.date = null;
  this.state = new State(state, World)

  this.increase = function (n){
      this.infection_rate+=n;
  }

  this.infect = function(){
      this.infects += this.infects*(this.infection_rate/100)
      this.infects = Math.round(this.infects)
    }

  this.print = function(){
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
  }
}

var State = function(state, World){
  this.World = World;
  this.reanimate_beds = state["reanimate_beds"];
  this.beds = state["beds"];
  this.pil = state["pil"];
  this.popolation = state["popolation"];
  this.public_debt = state["public_debt"];
  this.money = state["money"];
  this.infects = 2;
  this.infection_rate = 50;
  this.death_rate = 0;
  this.dead = 0;
  this.feeling = 100;
  this.red_zone=0;
  this.loans=[]

  this.increase = function (n){
    this.infection_rate += n;
  }
  this.infect = function(){
    this.infects += this.infects*(this.infection_rate/100)
    this.infects = Math.round(this.infects)  //bisogna come arrotondare, così è al meglio però boh
  }
  this.increase_debt = function (perc) {
    this.public_debt += this.public_debt*(perc/100)
    this.public_debt = Math.round(this.public_debt)

  }
  this.make_loan=function(Name,amount,date0,date1){
    this.loans.push(new Loan(date0,date1,amount))
  }
  this.increase_zone= function(n){
    this.increase_zone+=n
    this.feeling-=(n/50)
  }
  this.print = function(){
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
  }

  /* this.loan_reader = function(){
    var func = function(element){
      if(element.date1===this.World.date){
        increase_debt_perc = element.amount / this.money
        return increase_debt_perc
      }
      else{

      }
    }
    if (world.date ==      ) {
                                            // pass
    }
      increase_debt_perc = amount / this.money
      return increase_debt_perc
    else () {
      return true
    }
  }*/
  this.summary=function(){
    rate=0
    rate -= this.red_zone/100
    this.infection_rate+=rate
  }
}



var Loan = function(date0,date1,amount){
  this.date0=date0
  this.date1=date1
  this.amount=amount
}

var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
var curDay = date.getDate();
var curMonth = months[date.getMonth()];
var curYear = date.getFullYear();

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
var curDay = date.getDate();
var curMonth = months[date.getMonth()];
var curYear = date.getFullYear();

function following_month (curMonth) {
    a = months.indexOf(curMonth)
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


state1 = "italia"
w1 = new World(state1)
stato = w1.state

while (true) {
  sleep(1000)
  w1.date = clock()
  console.log(w1.date)


}
