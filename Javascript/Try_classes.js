

const states = {
    "italia" :
                {
                  "beds" : 150000,
                  "reanimate_beds" : 5000,
                  "pil" : 1935000000000,
                  "percentuale_pil_sanita": 6.5,
                  "popolation" : 60000000,
                  "public_debt" : 384738,
                  "money" : 48374837483,
                  "army_level" : 55344


                }
}

const options =[
  {
    "description":"",
    "death":0,
    "economy":0,
    "health":0,
    "feeling":0,
    "print": ()=> console.log( "After a long discussion, the Governement has decided that the best option in order to improve the actual situation is: \n ", this["description"]),


    
  },
  {

  },
]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
var World = function(state){
  this.state = new State(state, this)
  this.infects = 1;
  this.infection_rate = 0;
  this.death_rate=0;
  this.date = null;
  this.curMonth = 0
  this.month_numb
  this.curDay = 0
  

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


  // Start conversion dates


  this.from_date_to_month =  (date) => {    //chiamata da loan_reader_to_pay 

    if (isNaN(parseInt(date[1]))){
      var month = date.substring(1, date.length - 4)
    }
    else {
      var month = date.substring(2, date.length - 4)
    }
    const month_numb = months.indexOf(month) + 1
    return month_numb
  }

  this.from_date_to_day = (date) => {
    if (isNaN(parseInt(date[1]))){
      var day = date[0]                             //chiamata da loan_reader_to_pay 
    }
    else {
      var day = date[0] + date[1]
    }
    return day
  }

  // End conversion dates
}

var State = function(state, World){
  this.World = World
  this.Decisions = new Decisions(this, World)
  decision = this.Decisions
  this.reanimate_beds = state["reanimate_beds"]
  this.beds = state["beds"]
  this.pil = state["pil"]
  this.pil_0=this.pil
  this.popolation = state["popolation"]
  this.public_debt = state["public_debt"]
  this.money = state["money"]
  this.army_level = state["army_level"]
  this.rate_0=1
  this.infects = 10
  this.infection_rate = 1
  this.death_rate = 0
  this.dead = 0
  this.feeling = 100
  this.red_zone=0
  this.loans=[]
  this.pil_rate = 0 //sia positivo che negativo
  this.remainder = 0
  this.council_effects={
    death:0,
    economy:0,
    health:0,
    feeling:0
  }


  

  //tolto decrease e anche increase che erano inutili

  this.infect = () =>{
    this.infects += this.infects*(this.infection_rate/100)
    this.infects=Math.round(this.infects)
    //con il round gli infetti iniziali non possono essere 1 se no rimane 1 all'infinito
    /*
    let a = this.infects
    let b = Math.round(this.infects)  //bisogna come arrotondare, così è al meglio però boh
    this.infects = b
    this.reminder += (a - b)
    this.infects += this.reminder
    this.infects = Math.round(this.infects)
    */
   //non mi dà gli infetti con questo non so perchè prova a vedere
  }
  this.increase_debt =  (perc) =>{
    this.public_debt += this.public_debt*(perc/100)
    this.public_debt = Math.round(this.public_debt)
    
  }
  
  
  this.increase_zone= (n) =>{
    this.increase_zone+=n
    this.feeling-=(n/50)
  }
  this.print = () =>{
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
  }







  //-------------------------------------

  //Start loans section

  this.make_loan=(name,date0,date1,amount, stato) => {  //
    this.loans.push(new Loan(name,date0,date1,amount, stato))
  }


  this.loan_reader_expire = (element) =>{                         //chiamata da loan_reader_to_pay
    if (element.date1 === world.date) {                          //va con stato. e non con this.
      this.increase_debt(element.amount / this.money)                   //va con stato. e non con this.           
      console.log("Il debito di euro ",element.amount," non è stato pagato")
      console.log("nuovo debito pubblico", this.public_debt)
      this.loans.splice(this.loans.indexOf(element),1)
      this.loans=this.loans.filter(Boolean)
    }
    else {}
  }


  this.pay_loans_review = ()=> {
    if (this.loans.length !== 0){
    this.loans.forEach(this.loan_reader_to_pay)               //chiamata in summary
    }
    else{
      console.log("non ci sono prestiti da pagare")
    }
  }


  this.pay_loan = (element) => {
    const to_pay = false 
    if (to_pay === true){
      this.money -= element.amount
      console.log("hai pagato il debito di ",element.amount , "con la nazione ", element.state)
      console.log("nuovo capitale ", this.money)
      this.loans.splice(this.loans.indexOf(element),1)
      this.loans=this.loans.filter(Boolean)
    }
  }


  this.loan_reader_to_pay = (element) =>{     //chiamata da pay_loans_review
    const month = world.from_date_to_month(element.date1)
    const day = parseInt(world.from_date_to_day(element.date1))
    if (day - world.curDay === 1 && month === world.month_numb){
      console.log("il prestito", element.name, "con la nazione", element.state, "scade domani")
      this.pay_loan(element)
    }
    if (day - world.curDay === 15 && month === world.month_numb) {
      console.log("il prestito", element.name, "con la nazione", element.state, "scade tra 15 giorni")
      this.pay_loan(element)
    }
    else if (month - world.month_numb === 1 && day === world.curDay) {
      console.log("il prestito", element.name, "con la nazione", element.state, "scade tra 1 mese")
      this.pay_loan(element)    
    }
    else if (month - world.month_numb === 2 && day === world.curDay){
      console.log("il prestito", element.name, "con la nazione", element.state, "scade tra 2 mesi")
      this.pay_loan(element)
    }     
    else if (month - world.month_numb > 2){
      console.log("non scadono prestiti entro 2 mesi")
    }  
    else if (element.date1 === world.date){
      this.loan_reader_expire(element)
    }   
    else{
      console.log("ci sono prestiti da pagare, non ci sono prestiti scaduti")  //poi qui metteremo un tasto paga manuale
    }                                   
  }
  
// End loans section

//-------------------------------------

//Start council

this.council = () => {
  console.log("Day ",world.curDay,", month of ",world.month_letter)
  console.log()
  console.log("The Council has been convocated, forced by actual situations, and needs to take an important decision for the future")
  //random
  
  
  first_option=options[getRandomInt(0,options.length)]
  second_option=options[getRandomInt(0,options.length)]
  third_option=options[getRandomInt(0,options.length)]

  console.log("After a long discussion in collaboration with all the members of the Council three main options have been taken into serious consideration: ,")
  console.log("1. ", console.log(first_option))
  console.log("2. ", console.log(second_option))
  console.log("3. ", console.log(third_option))
  console.log("-----------------")
  console.log("Now it's up to the president to choose the principal strategy, then the choice will have also to pass the final verification of the Court in order to be executed properly and with immediate effect")
  //da mettere input con html


  //effects
  this.death_rate+=option_chosen["death"]
  this.feeling+=option_chosen["feeling"]//
  this.infection_rate-=(option_chosen["health"]/50)//
  this.pil_rate+=option_chosen["economy"]

  
  }
  this.court_validation=(option)=>{
    accept=true
    if(option.feeling>30 && this.red_zone>50)
    {
      if(getRandomInt(1,6)!==1){
        accept=false
      } 
    }

    if(option.health < -50 && (this.infects>(this.popolation/10)))
    {
      if(getRandomInt(1,6)!==1){
        accept=false
      }
    }
    if(option.economy < -50 && (this.infects>(this.popolation/10)))
    {
      if(getRandomInt(1,6)!==1){
        accept=false
      }
    }

    return accept
  }

  //end council

  //----------------------------------


  //Start summaries

  this.summary_economy = () =>{
    pil_var=0 //è in percentuale
    pil_var+=this.pil_rate
    this.pil+=(this.pil*(pil_var/1000)) //non andrebbe diviso per cento però il pil è grandissimo quindi per non influenzare troppo dividi per cento ancora,poi coi numeri vediamo dopo
  }

  this.summary_infect =() =>{
    
    var rate = this.rate_0
    rate += ((decision.schools_opened_perc / 100)*2)

    rate += (decision.museums_opened_perc / 100)
    rate += (decision.shops_opened_perc / 100)
    rate += (decision.food_opened_perc / 100)
    rate += (decision.ports_opened_perc/100)
    rate += ((decision.sports_allowed_perc/100)*2)
    rate += ((decision.remote_working_companies_perc/100)*2)

    //ai più importanti ho messo *2

    //se sono tutti aperti al massimo aumenta di 10 il rate che ci sta
    //tutte le decisions influiscono per un max del 10% di tutto il rate
    rate+= ((100-this.red_zone)/5)

    //se la red zone è 0 aumenta del 20 % l'infection rate
    
    if (decision.mandatory_masks) {
      if(rate > 0.5){
      rate -= 0.5
      }
      else{
        rate=0.0001
      }
    }
    if (decision.army_using) {
      if(rate >0.5){
      rate -= 0.3
      }
      else{
        rate=0.0001
      }
    }
    if (rate< this.rate_0){
      this.rate_0=rate
    }
    //se nella somma diminuisce rispetto al valore iniziale il valore iniziale si setta a quello più basso per i summary successivi, così possiamo mettere un rate_0 in base alle difficoltà da cui partire ma si può andare anche sotto quello durante il gioco e per fare il summary parte da quel rate e non da zero





    //questo va fatto alla fine di tutto
    this.infection_rate = rate 
    
  }

  //End summaries

  //--------------------------------

}


//end state


var Decisions = function(state, World){ 
  this.state = state
  this.World = World
  this.schools_opened_perc = 100
  this.museums_opened_perc = 100
  this.shops_opened_perc = 100
  this.food_opened_perc = 100
  this.ports_opened_perc = 100
  this.airports_opened_perc = 100
  this.sports_allowed_perc=100
  this.remote_working_companies_perc=100
  this.maximum_of_people_together_perc = 100
  this.mandatory_masks = false
  this.army_using = false
  this.almost_graduates_doc = false   //influiscono sui decessi
  this.new_hospitals = 0              //influiscono sui decessi
}


var Specializations = function(state, World){
  this.state = state
  this.World = World
  this.cardiology
  this.neurology
  this.resuscitation
  this.gynecology
  this.urology
  this.pulmonology
  this.pediatrics
  this.psychiatry
}



var Loan = function(name,date0,date1,amount,state){
  this.name=name
  this.date0 = date0
  this.date1 = date1
  this.amount = amount
  this.state = state
}







function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

state1 = "italia"
dicto_state = states[state1]
world = new World(dicto_state)
let stato = world.state
var c = 0



var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
world.curDay = date.getDate();                       
world.curMonth = months[date.getMonth()];
var curYear = date.getFullYear();

function following_month (curMonth) {
    a = months.indexOf(curMonth)
    curMonth = months[a + 1]
    return curMonth
}

function clock () {
    const _30_month = ['April', 'June', 'September', 'November'];
    const _31_month = ['January', 'March',  'May',  'July', 'August', 'October', 'December'];
    if (world.curMonth === "December" && world.curDay === 31) {
        curYear += 1
        world.curMonth = "January"
        world.curDay = 1
    }
    else {
        if (world.curDay >= 29) {
            if (world.curMonth === "February" && world.curDay === 29 ) {
                world.curMonth = following_month(world.curMonth)
                world.curDay = 1
            }
            else if (world.curDay === 30 && _30_month.includes(world.curMonth)) {
                world.curMonth = following_month(world.curMonth)
                world.curDay = 1
            }
            else if (world.curDay === 31 && _31_month.includes(world.curMonth)) {
                world.curMonth = following_month(world.curMonth)
                world.curDay = 1

            }
            else {world.curDay += 1}
        }
        else {world.curDay += 1}
    }
    date = world.curDay + world.curMonth + curYear
    world.month_numb = months.indexOf(world.curMonth) + 1
    return date
}




stato.make_loan("saas","20March2020", "25May2020",343000000, "Francia")



stato.rate_0=5
while (true) {
  c += 1
  sleep(1000)
  world.date = clock()
  console.log(world.date)
  console.log("rate prima : ",stato.infection_rate)
  stato.summary_infect()
  console.log(" ")
  console.log("rate dopo : ",stato.infection_rate)
  console.log()
  stato.infect()
  console.log(" ")
  stato.print()
  
  if (c === 5){
    stato.red_zone = 50
    console.log("rossa mod")
  }
  /*
  if (c === 10){
    decision.museums_opened_perc = 20
  }
  if (c === 15){
    decision.shops_opened_perc = 20
  }
  if (c === 20){
    decision.food_opened_perc = 20
  }
  if (c === 25){
    decision.museums_opened_perc = 20
  }
  if (c === 30){
    decision.ports_opened_perc = 20
  }*/
  
}
