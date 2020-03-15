const states = {
    "italia" :
                {
                    "beds" : 150000,
                    "reanimate_beds" : 5000,
                    "pil" : 1935000000000,
                    "percentuale_pil_sanita": 6.5,
                    "popolation" : 60000000,
                    "public_debt" : 384738,
                    "money" : 48374837483

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
  this.World = World
  this.reanimate_beds = state["reanimate_beds"]
  this.beds = state["beds"]
  this.pil = state["pil"]
  this.popolation = state["popolation"]
  this.public_debt = state["public_debt"]
  this.money = state["money"]
  this.infects = 2
  this.infection_rate = 50
  this.death_rate = 0
  this.dead = 0
  this.feeling = 100
  this.red_zone=0
  this.loans=[]
  this.pil_decrease = 0 //i deficit economici vanno nel decrease
  this.month = 0
  this.curDay = 0
  this.month_numb = 0

  this.increase =  (n)=>{
    this.infection_rate += n
  }
  this.infect = () =>{
    this.infects += this.infects*(this.infection_rate/100)
    this.infects = Math.round(this.infects)  //bisogna come arrotondare, così è al meglio però boh
  }
  this.increase_debt =  (perc) =>{
    this.public_debt += this.public_debt*(perc/100)
    this.public_debt = Math.round(this.public_debt)
    
  }
  this.make_loan=(name,date0,date1,amount, stato) => {  //tolto il name che non si usava
    this.loans.push(new Loan(name,date0,date1,amount, stato))
  }
  
  this.increase_zone= (n) =>{
    this.increase_zone+=n
    this.feeling-=(n/50)
  }
  this.print = () =>{
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
  }


  this.from_date_to_month =  (date)=> {    //chiamata da loan_reader_to_pay 
    if (isNaN(parseInt(date[1]))){
      month = date.substring(1, date.length - 4)
    }
    else {
      month = date.substring(2, date.length - 4)
    }
    month_numb = months.indexOf(month) + 1
    return month_numb
  }

  this.from_date_to_day = (date) =>{
    if (isNaN(parseInt(date[1]))){
      day = date[0]                             //chiamata da loan_reader_to_pay 
    }
    else {
      day = date[0] + date[1]
    }
    return day
  }

  this.loan_reader_expire = (element) =>{                         //chiamata da loan_reader_to_pay
    if (element.date1 === w1.date) {                          //va con stato. e non con this.
      this.increase_debt(element.amount / this.money)                   //va con stato. e non con this.           
      console.log("Il debito di euro ",element.amount," non è stato pagato")
      console.log("nuovo debito pubblico", this.public_debt)
      this.loans.splice(this.loans.indexOf(element),1)
      this.loans=this.loans.filter(Boolean);
    }
    else {}
  }



  this.pay_loans_review = ()=> {
    
    if (this.loans.length !== 0){

    this.loans.forEach(this.loan_reader_to_pay)               //chiamata in summary
    }
    else{
      console.log("non ci sono prestiti da pagare")      // non entra in questo else poi ci guardo
    }
  }

  this.pay_loan = () => {

  }


  this.loan_reader_to_pay = (element) =>{     //chiamata da pay_loans_review
    "use strict";           
    const month  = this.from_date_to_month(element.date1)
    const day = parseInt(this.from_date_to_day(element.date1))
    if (day - this.curDay === 1 && month === this.month_numb){
      console.log("il prestito", element.name, "con la nazione", element.stato, "scade domani")
      this.pay_loan()
    }
    if (day - this.curDay === 15 && month === this.month_numb) {
      console.log("il prestito", element.name, "con la nazione", element.stato, "scade tra 15 giorni")
      this.pay_loan()
    }
    else if (month - this.month_numb === 1 && day === this.curDay) {
      console.log("il prestito", element.name, "con la nazione", element.stato, "scade tra 1 mese")
      this.pay_loan()    
    }
    else if (month - this.month_numb === 2 && day === this.curDay){
      console.log("il prestito", element.name, "con la nazione", element.stato, "scade tra 2 mesi")
      this.pay_loan()
    }     
    else if (month - this.month_numb > 2){
      console.log("non scadono prestiti entro 2 mesi")
      this.pay_loan()
    }  
    else if (element.date1 === w1.date){
      this.loan_reader_expire(element)
    }   
    else{
      console.log("ci sono prestiti da pagare, non ci sono prestiti scaduti")  //poi qui metteremo un tasto paga manuale
    }                                   
  }
  


  this.summary_economy = () =>{
    pil_rate=0 //è in percentuale
    pil_rate-=this.pil_decrease //anche il decrease è in percentuale
    this.pil+=(this.pil*(pil_rate/1000)) //non andrebbe diviso per cento però il pil è grandissimo quindi per non influenzare troppo dividi per cento ancora,poi coi numeri vediamo dopo



  }

  this.summary_infect =() =>{
    rate=0
    rate -= this.red_zone/100
    this.infection_rate+=rate
  }

}









var Loan = function(name,date0,date1,amount,stato){
  this.name=name
  this.date0 = date0
  this.date1 = date1
  this.amount = amount
  this.stato = stato
}






var Arrangement=function(description,state){


}




function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
var curDay = date.getDate();                        //non funziona, non parte dal giorno corrente
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
    if (curMonth === "December" && stato.curDay === 31) {
        curYear += 1
        curMonth = "January"
        stato.curDay = 1
    }
    else {
        if (stato.curDay >= 29) {
            if (curMonth === "February" && stato.curDay === 29 ) {
                curMonth = following_month(curMonth)
                stato.curDay = 1
            }
            else if (stato.curDay === 30 && _30_month.includes(curMonth)) {
                curMonth = following_month(curMonth)
                stato.curDay = 1
            }
            else if (stato.curDay === 31 && _31_month.includes(curMonth)) {
                curMonth = following_month(curMonth)
                stato.curDay = 1

            }
            else {stato.curDay += 1}
        }
        else {stato.curDay += 1}
    }
    date = stato.curDay + curMonth + curYear
    stato.month_numb = months.indexOf(curMonth) + 1
    return date
}


state1 = "italia"
dicto_state = states[state1]
w1 = new World(dicto_state)
stato = w1.state





stato.make_loan("saas","11March2020", "20March2020",343000000, "Francia")

while (true) {
  sleep(300)
  w1.date = clock()
  console.log(w1.date)
  stato.pay_loans_review()
  
}
