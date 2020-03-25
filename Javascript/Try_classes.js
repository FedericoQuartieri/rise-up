

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
]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}
var World = function(state){
  this.state = new State(state, this)
  this.infects = 0;
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
  this.reanimate_beds = state["reanimate_beds"]
  this.beds = state["beds"]
  this.pil = state["pil"]
  this.pil_0=this.pil
  this.popolation = state["popolation"]
  this.public_debt = state["public_debt"]
  this.money = state["money"]
  this.army_level = state["army_level"]
  this.rate_0 = 1
  this.infects = 10
  this.infection_rate = 1
  this.death_rate = 0
  this.dead = 0
  this.feeling = 100
  this.loans=[]
  this.rate_economy_daily=0
  this.rate_feeling_daily=0
  this.pil_rate = 0 //sia positivo che negativo
  this.remainder = 0

  this.make_decision = (decision) => {
    //input level
    const level = 1
    const dec = this.decision[decision]
    news = (100/5)*level
    new_e=news
    new_f=news

    if(decision==="block_trades_e"){
      this.block_trades()
    }

    else
    {

    if(decision==="shops_opened"||decision==="companies_opened"){
      if(level!==5){
        new_e+=10
      }
    }
    if(decision==="schools_opened"||decision==="airports_opened"){
      news_e-=10
    }

    //se shops o companies influisce di più , se scuole o aeroporti di meno
    
    dec[0] = news
    this.decision[decision]=new_f
    this.decision[decision]=new_e
  }


    

  }

  this.decision = {
    schools_opened : [100, 100,0], 
    museums_opened : [100, 100,0],
    shops_opened : [100, 100,0] ,
    ports_opened : [100, 100,0],
    airports_opened : [100, 100,0],
    sports_allowed : [100, 100,0],
    remote_working_companies : [100, 100,0],
    companies_opened : [100, 100,0],
    red_zone : [0, 100,0],
    mandatory_masks : [false, 100,null],
    army_using : [false, 100,0],
    almost_graduates_doc : [false, null,null],
    new_hospitals : [0, null,0],
    
    //economy

    close_stock_e: [false],
    block_trades_e: [0,0,0]
    }

  this.continue=()=> !(this.infects===this.popolation || this.feeling===0 || this.pil===this.pil_0*0.3)
  
  this.infect = () =>{
    dead_day = this.infects*(this.death_rate/1000)  //death rate è già una perc, fatto così non muore troppa gente (al massimo del death rate muore il 10% degli infetti al giorno)
    this.infects -= dead_day
    this.dead += dead_day 
    
    if (this.infects + this.infects*(this.infection_rate/100) < this.popolation){
      this.infects += this.infects*(this.infection_rate/100)
      if (this.remainder >= 1){
        this.infects = this.infects + this.remainder
        this.remainder = this.remainder-Math.trunc(this.remainder)
      }
      const remainder = this.infects - Math.trunc(this.infects)
      this.remainder += remainder 
      this.infects=Math.trunc(this.infects)       
    }
    else {
      this.infects = this.popolation
    }
  }

  this.money_decrease = (money) => {
    if (money > this.money){
      console.log("non hai abbastanza capitale")
      //input = date_expire ; stato
      this.make_loan("saas",world.date, date, money, stato)
    }
    else{
      this.money -= money
    }
  }


  this.increase_debt =  (perc) =>{
    this.public_debt += this.public_debt*(perc/100)
    this.public_debt = Math.round(this.public_debt)
    
  }

  this.print = () =>{
      console.log("\n", "day : ", world.date)
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
  }


  //-------------------------------------
  // block

  this.block_trades=()=>{
    console.log(" What level of trading block do you want to set?")
    console.log() //correggerò l'inglese poi
    console.log("1.Limit to essential every trade from  adjoinig countries")
    console.log("2. Limit every trade ")
    console.log("3. Block trades from  adjoinig countries")
    console.log("4. Block trades from  and to adjoinig countries")
    console.log("5. Block every economic import")
    console.log("6. Shut down international commerce (imports and exports)")
    //input
    const choice=getRandomInt(1,7)
    const outcome=[] //[health,feeling,economy]
    switch(choice){

      case 1:
        outcome.push(-10)
        outcome.push(.1)
        outcome.push()
        break

      case 2:
        outcome.push(-20)
        outcome.push(.3)
        outcome.push()
        break

      case 3:
        outcome.push(-30)
        outcome.push(.4)
        outcome.push()
        break
        
      case 4:
        outcome.push(-40)
        outcome.push(.5)
        outcome.push()
        break

      case 5:
        outcome.push(-50)
        outcome.push(2)
        outcome.push()
          break

      case 6:
        outcome.push(-60)
        outcome.push(5)
        outcome.push()
        break

      }
      this.decision.block_trades_e[outcome]
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
    option_chosen= first_option

    if(this.court_validation(option_chosen)===true){
      //effects
      this.death_rate+=option_chosen["death"]/100
      this.feeling+=option_chosen["feeling"]//
      this.infection_rate-=(option_chosen["health"]/50)//
      this.pil_rate+=option_chosen["economy"]

    }
    else{
      console.log(this.court_validation(option_chosen))
    }
    //end council

    this.court_validation=(option)=>{
      const acceptance = true
      const h=false
      const f=false
      const d=false
      const e=false
      if(option.feeling>30 && this.red_zone>50)
      {
        if(getRandomInt(1,6)!==1){
          acceptance=false
          f=true
        } 
      }

      if(option.health < -50 && this.infects > this.popolation/10){
        if(getRandomInt(1,6)!==1){
          acceptance = false
          h=true
        }
      }
      if(option.economy < -50 && (this.pil<=this.pil_0*0.75)){
        if(getRandomInt(1,6)!==1){
          acceptance=false
          e=false
        }
      }
      if(option.death > 25 && this.death_rate >50 ){
        if(getRandomInt(1,6)!==1){
          acceptance=false
          d=false
        }
      }
      if(acceptance){
        return true
      }
      else{
        const response=""
        const tot=[]
        if(d){
          const r="issues concerning the mortality of the plague"
          tot.push(r)
        }
        if(e){
          const p=" issues concerning economical aspects"
          tot.push(p)
        }
        if(f){
          const z=" issues concerning the effect on the population"
          tot.push(z)
        }
        if(h){
          const q=" issues concerning the priority to avoid infections"
          tot.push(q)
        }
        response+="The court has reunited and decided that the President's choice was hazardous according to the actual situation especially because of "
        response+=tot[0]

        for(let i=1;i<tot.length;i++){
          if(i===tot.length-1){
            response+=" and "
          }
          else{
            response+=" , "
          }    
          response+=tot[i]    
        }
        return response
      }
    }
  }



  //----------------------------------


  //Start summaries

  this.summary_death=()=>{
    this.death_rate+=((100-this.Decisions.new_hospitals)/5) //massimo di nuovi ospedali è 100, se ce ne sono zero (minimo), death rate aumenta del 20%
    
    if(!this.Decisions.almost_graduates_doc){
      this.death_rate+=10
    }
  }





  this.summary_economy = () =>{
    rate=0 
    Object.keys(this.decision).forEach(key =>{
      if(key !== "mandatory_masks" && key != "almost_graduated_doc" && key != "army_using" && key != "new_hospitals"){
        if(key==="red zone"){
          rate+=(this.decision[key][2]/10)*2
        }
        else{

          rate+=(this.decision[key][2]/10)
        }}})

    this.pil_rate=rate


    

    

     //non andrebbe diviso per cento però il pil è grandissimo quindi per non influenzare troppo dividi per cento ancora,poi coi numeri vediamo dopo
  }

  this.summary_feeling=() =>{
    rate=0
    if(this.decision["close_stock"]){
      rate+= 1
    }


    //il rate massimo giornaliero toglie 5 punti al feeling
  }



  this.summary_infect =() =>{ 
    var rate = this.rate_0  
    /*
    rate += ((stato.decision["schools_opened"][0] / 100)*2) / (stato.decision["schools_opened"][1] /100)  
    rate += ((stato.decision["museums_opened"][0] / 100)*2) / (stato.decision["museums_opened"][1] /100)
    rate += ((stato.decision["shops_opened"][0] / 100)*2) / (stato.decision["shops_opened"][1] /100)
    rate += ((stato.decision["ports_opened"][0] / 100)*2) / (stato.decision["ports_opened"][1] /100)
    rate += ((stato.decision["airports_opened"][0] / 100)*2) / (stato.decision["airports_opened"][1] /100)
    rate += ((stato.decision["sports_allowed"][0] / 100)*2) / (stato.decision["sports_allowed"][1] /100)
    rate += ((stato.decision["remote_working_companies"][0] / 100)*2) / (stato.decision["remote_working_companies"][1] /100)
    rate += ((stato.decision["companies_opened"][0] / 100)*2) / (stato.decision["companies_opened"][1] /100)
    rate += ((stato.decision["red_zone"][0] / 100)*2) / (stato.decision["red_zone"][1] /100)
    */
    const pattern=/_e/
    const filt={}

    Object.keys(this.decision).forEach(str=>{
      if(!pattern.test(str)){
        filt[str]=this.decision[str]
      }
    })
    
    Object.keys(filt).forEach(key =>{
      if(key !== "mandatory_masks" && key != "almost_graduated_doc" && key != "army_using" && key != "new_hospitals"){ 
      rate+=(((this.decisions[key][0]/100)*2)/(this.decision[key][1]/100))
      }
      

    })
    //tutte le decisions influiscono per un max del 12% di tutto il rate più 20% della zona rossa e 2% true/false
       
    if (this.decision["mandatory_masks"]) {
      rate -= 0.5
    }

    rate+=this.decision["block_trades_e"][0]/100

    if (rate < this.rate_0){
      rate = this.rate_0
    }

    //questo va fatto alla fine di tutto
    this.infection_rate = rate 
    
  }
  


  this.summaries=()=>{
    this.summary_infect()
    this.summary_economy()

    if(pil_rate>rate_economy_daily){
      console.log("peggiorata economia")
      this.pil-=(this.pil*((pil_rate-rate_economy_daily)/1000))


    }
    else if(pil_rate===rate_economy_daily){
      console.log("uguale economia")
    }
    else{
      console.log("migliorata economia")
      const nr=(rate_economy_daily-pil_rate)
      this.pil+=(this.pil*(nr/1000))
    }
    this.rate_economy_daily=this.pil_rate


    this.summary_death()
    //this.summary_feeling()



    this.infect()
    
    
  }
  //End summaries

  //--------------------------------

}


//end state


/*
  this.right_way_to_say = (decision_feel, level) => {     // è il modo in cui esponi le leggi al popolo che influenza il feeling
    console.log("...") // input right                     
    console.log("...") //input wrong
    const input = "right"                   //se viene detto in modo corretto il feeling aumenta e quindi diminuisce la percentuale
    if (input === "wrong"){                 //se viene detto in modo sbagliato il feekung diminuisce quindi aumenta la percentuale
      decision_feel = ((100/4)*level)/2     //aumento in modo direttamente proporzionale al livello di restriizioni massimo 50% minimo 12.5%
    }
    else if (input === "right"){
      decision_feel /= 2
    }
  }*/



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


while (stato.continue()) {
  c += 1
  sleep(1000)
  world.date = clock()
  stato.make_decision("schools_opened_perc")
  console.log(stato.decision["schools_opened_perc"])
  /*
  stato.summary_infect()
  stato.print()
  stato.infect()
  stato.print()
  
  if (c === 5){
    decision.red_zone = 100
    console.log("rossa mod")
  }
  
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
