
const states = {
  "italia" :
              {
                "other_beds" : 150000,
                "reanimate_beds" : 5000,
                "pil" : 1935000000000,
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

function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}

var Loan = function(date0,date1,amount){
  this.date0 = date0
  this.date1 = date1
  this.amount = amount
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


  //-----------Starts Dates-----------


  this.clock = () => {
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
                world.curMonth = world.following_month(world.curMonth)
                world.curDay = 1
            }
            else if (world.curDay === 30 && _30_month.includes(world.curMonth)) {
                world.curMonth = world.following_month(world.curMonth)
                world.curDay = 1
            }
            else if (world.curDay === 31 && _31_month.includes(world.curMonth)) {
                world.curMonth = world.following_month(world.curMonth)
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

  this.following_month = (curMonth) => {
    a = months.indexOf(curMonth)
    curMonth = months[a + 1]
    return curMonth
  }
  
  


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
}


//-----Start State------


var State = function(state, World){
  this.World = World
  this.reanimate_beds = state["reanimate_beds"]
  this.other_beds = state["other_beds"]
  this.pil = state["pil"]
  this.health_funds_rate = 5000000000 / this.pil 
  this.pil_0=this.pil
  this.popolation = state["popolation"]     
  this.public_debt = state["public_debt"]
  this.money = state["money"]
  this.army_level = state["army_level"]
  this.rate_0 = 1
  this.infects = 50
  this.infection_rate = 1
  this.dead = 1
  this.feeling = 100
  this.loans=[]
  this.council_effects=[] //[health,feeling,economy,death]
  this.rate_economy_daily=0
  this.rate_feeling_daily=0
  this.pil_rate = 0 //sia positivo che negativo
  this.reminder_infect = 0
  this.reminder_non_virus_dead = 0
  this.reminder_dead = 0
  this.need_medical = 0
  this.beds_feeling = 100
  this.non_virus_dead_rate = 0
  this.death_daily = 0
  this.non_virus_death_daily = 0
  this.non_virus_dead = 0
  this.economy_judgment = ""
  this.health_funds_used = 0
  this.economy_rate = (100-(this.pil/this.pil_0 *100))


  this.continue=()=> !(this.infects===this.popolation || this.feeling===0 || this.economy_rate > 30)


  //start decision

  this.make_decision_red = (level) => {
    this.decision["red_zone"][0] = level
    this.decision["red_zone"][1] = 100-level
    this.decision["red_zone"][2] = level
  }

  this.make_decision = (decision, level_closing) => {
    //const level_closing = 1
    const dec = this.decision[decision]
    news = 100-((100/5)*level_closing)
    new_e=100-news
    new_f=news

    if(decision==="block_trades_e"){
      this.block_trades()
    }
    else {
      dec[0] = news
      dec[1] = new_f
      dec[2] = new_e

    }
  }

  this.decision = {//helth feeling economy     health good = 0 feeling good = 100 economy good = 0
    schools_opened : [100, 100,0],
    museums_opened : [100, 100,0],
    shops_opened : [100, 100,0],
    ports_opened : [100, 100,0],
    airports_opened : [100, 100,0],
    sports_allowed : [100, 100,0],
    remote_working_companies : [100, 100,0],
    companies_opened : [100, 100,0],
    red_zone : [0, 100,0],
    block_trades_e : [100,100,0],       //different function
    mandatory_masks : false,
    army_using : false,
    close_stock: false,
    new_hospitals : 0
  }


  //start specializations


  this.make_new_hospital = () => {
    this.decision["new_hospitals"] += 1
    this.health_funds -= 1000000000
    this.health_funds_used += 1000000000
    this.reanimate_beds += 2000
  }


  this.make_change_bed_random = () => {
    spec = []
    Object.keys(this.specializations).forEach(key => {
      spec.push(key)
    })
    return spec[Math.floor(Math.random() * spec.length)]
  }

  this.make_change_bed = (level) =>{
    let c = 0
    Object.keys(this.specializations).forEach(key => {
      if(key !== "beds_possible" && key !== "min" && key !== "level"){
        if (this.specializations[key] === this.specializations["min"]){
          c += 1
        }
      }
    })
    if (c !== 7){
      let specialization = this.make_change_bed_random()
      while (this.specializations[specialization] - (this.specializations["level"]*level)  < this.specializations["min"])
        specialization = this.make_change_bed_random()
      //const level //input level da 1 a 10
      news = this.specializations["beds_possible"]*((level*20)/100)
      new_spec = this.specializations["beds_possible"] - news
      if (new_spec < this.specializations["min"]){
        new_spec = this.specializations["min"]
      }
      this.specializations[specialization] = new_spec
      this.reanimate_beds += level * this.specializations["level"]
      this.changings_bed_problems()
    }
    else if (c === 7){
      console.log("non ci sono letti disponibili, costruisci nuovi ospedali")
    }
  }


  this.changings_bed_problems = () =>{
    let total_beds = 0
    Object.keys(this.specializations).forEach(key =>{
      if(key !== "beds_possible" && key !== "min" && key !== "level"){
        total_beds += this.specializations[key]
        console
      }
    })
    this.beds_feeling = (total_beds / this.other_beds)*100   //min 5 max 100
    this.non_virus_dead_rate = 100-this.beds_feeling
  }

  this.specializations = {
    cardiology_beds : Math.trunc(this.other_beds/7),
    neurology_beds : Math.trunc(this.other_beds/7),
    gynecology_beds : Math.trunc(this.other_beds/7),
    urology_beds : Math.trunc(this.other_beds/7),
    pulmonology_beds : Math.trunc(this.other_beds/7),
    pediatrics_beds : Math.trunc(this.other_beds/7),
    psychiatry_beds : Math.trunc(this.other_beds/7),
    beds_possible : Math.trunc((this.other_beds/7) - (this.other_beds/7 *0.05)),
    min : Math.trunc((this.other_beds/7) * 0.05),
    level : Math.trunc((((this.other_beds/7) - (this.other_beds/7 *0.05))) * 0.2)
  }


  //end specialization


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


  this.print = () =>{
      console.log("\n", "day : ", world.date)
      console.log("infected : " ,this.infects)
      console.log("rate : " ,this.infection_rate)
      console.log("feeling :", this.feeling)
      console.log("dead :" ,this.dead)
      console.log("economy perc:","-", this.economy_rate,"%")
      console.log(this.economy_judgment)
      console.log("pil rate: ", this.pil_rate)
      console.log("health funds :", this.health_funds)
      console.log("healh funds used: ", this.health_funds_used)
      console.log("pil :", this.pil)
  }

  //-------------------------------------
  // Start block section

  this.block_trades=(choice)=>{
    console.log(" What level of trading block do you want to set?")
    console.log() //correggerò l'inglese poi
    console.log("1. No blocks")
    console.log("2. Limit every trade ")
    console.log("3. Block trades from  adjoinig countries")
    console.log("4. Block trades from  and to adjoinig countries")
    console.log("5. Block every economic import")
    console.log("6. Shut down international commerce (imports and exports)")
    //input
    //const choice=getRandomInt(1,7)
    const outcome=[] //[health,feeling,economy]
    switch(choice){

      case 1:
        outcome.push(100)
        outcome.push(100)
        outcome.push(0)
        break

      case 2:
        outcome.push(80)
        outcome.push(80)
        outcome.push(20)
        break

      case 3:
        outcome.push(70)
        outcome.push(70)
        outcome.push(30)
        break

      case 4:
        outcome.push(50)
        outcome.push(50)
        outcome.push(50)
        break

      case 5:
        outcome.push(20)
        outcome.push(20)
        outcome.push(80)
        break

      case 6:
        outcome.push(0)
        outcome.push(0)
        outcome.push(100)
        break


    }
    this.decision["block_trades_e"]=outcome
  }


  this.health_funds_calcolate = () => {
    health_funds = this.pil * this.health_funds_rate
    this.health_funds = health_funds - this.health_funds_used
  }

  //-------------Start loans section------------------

  this.make_loan=(date0,date1,amount) => {
    this.loans.push(new Loan(date0,date1,amount))
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

  this.riot=()=>{

  }
  //-------------------------------------

  //Start council section

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
      this.death+=(option_chosen["death"]/this.infects)
      this.feeling+=option_chosen["feeling"]/100//
      this.infects+=(this.infects*(option_chosen["health"]/50)/100)//
      this.pil+=this.pil*(option_chosen["economy"]/1000)

    }
    else{
      console.log(this.court_validation(option_chosen))
    }

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

  //------------End council section-------






  //--------Start Updaters------------


  
  this.non_virus_death_update = () =>{
    if (this.reminder_non_virus_dead >= 1){
      this.non_virus_death_daily = Math.trunc(this.reminder_non_virus_dead)
      rem = this.reminder_non_virus_dead - Math.trunc(this.reminder_non_virus_dead)
      this.reminder_non_virus_dead = rem
    }
    else {
      this.non_virus_death_daily = 0
    }
    this.reminder_non_virus_dead += this.non_virus_dead_rate/100
    this.non_virus_dead += this.non_virus_death_daily
  }

  this.infect = () =>{
    if (this.infects + this.infects*(this.infection_rate/100) < this.popolation){
      this.infects += this.infects*(this.infection_rate/100)
      if (this.reminder_infect >= 1){
        this.infects = this.infects + this.reminder_infect
        this.reminder_infect = this.reminder_infect-Math.trunc(this.reminder_infect)
      }
      const rem = this.infects - Math.trunc(this.infects)
      this.reminder_infect += rem
      this.infects=Math.trunc(this.infects)
    }
    else {
      this.infects = this.popolation
    }
  }


  this.economy_update  = () => {
    if(this.pil_rate>this.rate_economy_daily){
      this.economy_judgment = "peggiorata economia"
      //const nr=this.pil_rate-this.rate_economy_daily
      this.pil-=(this.pil_0*((this.pil_rate)/500))
      console.log(this.pil_0*((this.pil_rate)/500))


    }
    else if(this.pil_rate===this.rate_economy_daily){
      this.economy_judgment = "uguale economia"
      this.pil-=(this.pil_0*(this.pil_rate/1000))
      console.log(this.pil_0*(this.pil_rate/1000))
    }

    else{
      this.economy_judgment = "migliorata economia"
      const nr=(this.rate_economy_daily-this.pil_rate)
      this.pil+=(this.pil_0*(nr/100))
      console.log(this.pil_0*(nr/100))
    }
    this.rate_economy_daily=this.pil_rate
    this.economy_rate = 100-(this.pil/this.pil_0 *100)
  }

  //--------end updaters------------




  //-----------Start summaries-------------

  this.summary_death = () => {
    this.non_virus_death_update()
    let total_death = this.infects * 0.03
    let death = total_death - this.dead
    this.need_medical = this.infects * 0.2
    actually_med = (this.need_medical - this.reanimate_beds)
    if (actually_med > 0){
      death += actually_med
      console.log("non ci sono abbastanza letti")
    }
    if (this.reminder_dead >= 1){
      death += Math.trunc(this.reminder_dead)
      rem = this.reminder_dead - Math.trunc(this.reminder_dead)
      this.reminder_dead = rem
    }
    this.reminder_dead += death - Math.trunc(death)
    death = Math.trunc(death)
    this.death_daily = death + this.non_virus_death_daily
    this.dead += this.death_daily
    this.infects -= death
  }


  this.summary_economy = () =>{
    let rate=0
    Object.keys(this.decision).forEach(key =>{
      if(key !== "mandatory_masks" && key !== "army_using" && key !== "new_hospitals" && key !== "close_stock"){
        if(key==="red zone"){
          rate+=(this.decision[key][2]/100)*2
        }
        else{
          rate+=(this.decision[key][2]/100) 
        }
      }
      else if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){
        if (this.decision[key] === true){
          rate += 1
        }
      }
      else if (key === "new_hospitals"){
        rate += this.decision[key]

      }
    })
    this.pil_rate = rate
    this.economy_update()
    //non andrebbe diviso per cento però il pil è grandissimo quindi per non influenzare troppo dividi per cento ancora,poi coi numeri vediamo dopo
  }

  this.summary_feeling=() =>{
    let sum=0
    c=0
    Object.keys(this.decision).forEach(key => {
      //console.log(key, this.decision[key])
      if(key !== "mandatory_masks" && key !== "army_using" && key !== "new_hospitals" && key !== "close_stock" && key !== "red_zone"){
        sum += this.decision[key][1]
        c += 1
      }
      else if (key === "red_zone"){
        sum += this.decision[key][1] *2
        c += 2 
      }
      else if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){
        if (this.decision[key] === true){
          sum -= 1
        }
        else if(this.decision[key] === false){
          sum += 1
        }
      }
    })
    sum += this.beds_feeling*2
    c+=2
    this.feeling = sum / c
    this.feeling -= this.feeling * (this.death_daily / this.dead)
    if (this.feeling <0){
      this.feeling = 0
    }

  }


  this.summary_infect =() =>{
    var rate = this.rate_0
    rate += 10
    Object.keys(this.decision).forEach(key =>{
      if(key !== "mandatory_masks" && key !== "army_using" && key !== "new_hospitals" && key !== "close_stock" && key !=="red_zone"){
        rate += (this.decision[key][0]/100)
      }
      else if(key === "red_zone"){
        rate += ((100-this.decision[key][0])/100)
      }
      else if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){
        if (this.decision[key] === true){
          rate -= 0.5 
        }
        else if(this.decision[key] === false){
          rate += 0.5
        }
      }
    })
    if (rate < this.rate_0){
      rate = this.rate_0
    }
    this.infection_rate = rate
    this.infect()
  }


  this.summaries=()=>{
    this.summary_infect()
    this.summary_economy()
    this.summary_feeling()
    this.summary_death()
    this.health_funds_calcolate()
  }
  

}


//end state


/*
schools_opened : [100, 100,0],
    museums_opened : [100, 100,0],
    shops_opened : [100, 100,0],
    ports_opened : [100, 100,0],
    airports_opened : [100, 100,0],
    sports_allowed : [100, 100,0],
    remote_working_companies : [100, 100,0],
    companies_opened : [100, 100,0],
    red_zone : [0, 100,0],
    block_trades_e : [0,100,0],
    mandatory_masks : false,
    army_using : false,
    close_stock: false,
    new_hospitals : 0
*/

debug_make_decision = (c) => {
  console.log("counter",c)
  if (c === 23){
    stato.make_new_hospital()
  }
  else if (c === 3333){
    stato.make_new_hospital()
  }
  else if (c === 100 ){
    stato.make_new_hospital()
  }
  else if (c === 500){
    stato.make_new_hospital()
  }
  else if (c === 300){
    stato.make_new_hospital()
  }
  else if (c === 1){
    stato.make_decision("schools_opened", 5)
  }
  else if (c === 3){
    stato.make_decision("shops_opened", 5)
  }
  else if (c === 6){
    stato.make_decision("schools_opened", 0)
  }
  else if (c === 5){
    stato.make_decision("museums_opened", 5)
  }
  else if (c === 7){
    stato.make_decision("ports_opened", 5)
  }
  else if (c === 9){
    stato.make_decision("airports_opened", 5)
  }
  else if (c === 11){
    stato.make_decision("companies_opened", 5)
  }
  else if (c === 13){
    stato.make_decision("remote_working_companies", 5)
  }
  else if (c === 15){
    stato.decision["army_using"] = true 
  }
  else if (c === 17){
    stato.make_decision("sports_allowed", 5)
  }
  else if (c === 19){
    stato.decision["close_stock"] = true 
  }
  else if (c === 21){
    stato.decision["mandatory_masks"] = true 
  }
  else if (c === 23){
    stato.make_decision_red(100)
  }
  else if (c === 25){
    stato.block_trades(6)
  }
  else if (c === 27){
  }
  /*
  else if (c === 15){
    stato.make_change_bed(5)
  }
  else if (c === 20){
    stato.make_change_bed(5)
  }
  else if (c === 21){
    stato.make_change_bed(5)
  }
  else if (c === 22){
    stato.make_change_bed(5)
  }
  else if (c === 23){
    stato.make_change_bed(5)
  }
  else if (c === 24){
    stato.make_change_bed(5)
  }
  else if (c === 25){
    stato.make_change_bed(5)
  }*/
}


state1 = "italia"
dicto_state = states[state1]
world = new World(dicto_state)
let stato = world.state
//let count = 0

/*
var date = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var curWeekDay = days[date.getDay()];
world.curDay = date.getDate();
world.curMonth = months[date.getMonth()];
var curYear = date.getFullYear();


stato.make_loan("saas","20March2020", "25May2020",343000000, "Francia")

while (stato.continue()) {
  sleep(1000)
  count += 1
  world.date = world.clock()
  stato.summaries()
  stato.print()
  debug_make_decision(count)
}
*/







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
