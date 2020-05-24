
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  })
  
  return vars;
}

var difficulty = getUrlVars()["var"];



const states = {
  "italia" :
              {
                "other_beds" : 2000000,
                "reanimate_beds" : 100000,
                "pil" : 1935000000000,
                "popolation" : 60000000,
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


var Loan = function(date1,amount,perc_paid, perc_not_paid, risk){
  this.date1 = date1
  this.amount = amount
  this.perc_paid = perc_paid
  this.perc_not_paid = perc_not_paid
  this.risk = risk
}

var World = function(state){
  this.state = new State(state, this)
  this.infects = 0;
  this.infection_rate = 0;
  this.death_rate=0;
  this.date = null;
  this.curMonth = 0
  this.month_numb = 1
  this.curDay = 0
  this.curYear = 0
  this.initial_year = 0
  this.initial_month = 0
  this.initial_day = 0


  //-----------Starts Dates-----------


  


  this.from_date_to_month =  (date) => {    //chiamata da loan_reader_to_pay
    if (isNaN(parseInt(date[1]))){
      //date = date.replace((date[0]),"")
      console.log(date)

      //var month = date.replace((date[date.length - 4]+date[date.length - 3]+date[date.length - 2]+date[date.length - 1]),"")
      var month = date.toString().substring(1, date.length - 4)
      console.log(month)
    }
    else {
      //date = date.replace((date[0]+date[1]),"")
      console.log(date)
      //var month = date.replace((date[date.length - 4]+date[date.length - 3]+date[date.length - 2]+date[date.length - 1]),"")

      var month = date.toString().substring(2, date.length - 4)
      console.log(month)
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
  this.from_date_to_year = (date) => {
    //year = date[date.length - 4]+date[date.length - 3]+date[date.length - 2]+date[date.length - 1]
    if (isNaN(parseInt(date[1]))){
      var month = date.substring(1, date.length - 4)
      var year = date.toString().substring(1 + month.length, date.length)

    }
    else {
      var month = date.substring(2, date.length - 4)
      var year = date.toString().substring(2 + month.length, date.length)
    }
    return year
  }
}


//-----Start State------


var State = function(state, World){
  this.world = World
  this.reanimate_beds = state["reanimate_beds"]
  this.other_beds = state["other_beds"]
  this.pil = state["pil"]
  this.health_funds_rate = 500000000000 / this.pil 
  this.pil_0=this.pil
  this.perc_economy=((this.pil/this.pil_0).toFixed(3))*100
  this.popolation = state["popolation"]     
  this.public_debt = state["public_debt"]
  this.money = state["money"]
  this.army_level = state["army_level"]
  this.rate_0 = 1
  this.infects = 1
  this.perc_infects=((this.infects/this.popolation)*100).toFixed(3)
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
  this.virus_dead = 1
  this.non_virus_death_daily = 0
  this.non_virus_dead = 0
  this.economy_judgment = ""
  this.health_funds_used = 0
  this.health_funds = 500000000000
  this.health_funds_loan = 0
  this.loan_expired = false
  this.economy_rate = (100-(this.pil/this.pil_0 *100))
  this.reanimate_beds_hospitals = 0
  this.feeling_dead = 100
  this.feeling_non_virus_dead = 100
  this.riot_type = ""
  this.riots =0
  this.end_game = null
  this.loan_expired = false
  this.economy_riot_influence = 0
  this.economy_loan_influence = 0
  this.difficulty = difficulty
  this.win_date = ""
  this.decision_dictonary = {
    schools_opened : [100, 100,0],
    museums_opened : [100, 100,0],
    shops_opened : [100, 100,0],
    ports_opened : [100, 100,0],
    airports_opened : [100, 100,0],
    sports_allowed : [100, 100,0],
    companies_opened : [100, 100,0]
  }


  //start decision

  this.make_decision_red = (level) => {
    this.decision["red_zone"][0] = level
    this.decision["red_zone"][1] = level
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
    companies_opened : [100, 100,0],
    red_zone : [0, 100,0],
    block_trades_e : [100, 100,0],       //different function
    mandatory_masks : false,
    army_using : false,
    close_stock: false,
    new_hospitals : 0
  }


  //start specializations


  this.make_new_hospital = () => {
    this.decision["new_hospitals"] += 1
    this.health_funds -= 100000000000
    this.health_funds_used += 100000000000
    this.specializations["reanimate_beds"] += 100000
    this.reanimate_beds += 100000
    this.reanimate_beds_hospitals += 100000
  }

  this.make_change_bed_random = () => {
    spec = []
    Object.keys(this.specializations).forEach(key => {
      if (key !== "beds_possible" && key !== "reanimate_beds" && key !== "min" && key !== "level"){
        spec.push(key)
      }
    })
    return spec[Math.floor(Math.random() * spec.length)]
  }

  this.make_change_bed = (beds) =>{
    console.log(beds)
    beds = parseInt(beds)
    let c = 0
    Object.keys(this.specializations).forEach(key => {
      if(key !== "min" && key !== "level" && key !== "reanimate_beds"){
        if (this.specializations[key] === this.specializations["min"]){
          c += 1
        }
      }
    })
    if (c !== 7){
      let specialization = this.make_change_bed_random()
      max = 0
      Object.keys(this.specializations).forEach(key => {
        if(key !== "min" && key !== "level" && key !== "reanimate_beds"){
          if (this.specializations[key] > max){
            max = this.specializations[key]
          }
        }
      });
      while(this.specializations[specialization] - beds < this.specializations["min"]){   
        if (max - beds > this.specializations["min"]){
          specialization = this.make_change_bed_random()
          console.log(specialization)
        }
        else{
          console.log("diminuisci il numero di letti")
          beds = 0
          break
        }
      }
      var new_beds = 0
      if (this.specializations[specialization] - beds - this.specializations["min"] < 50){
        new_beds = this.specializations["min"]
        console.log(beds)
      }
      else{
        new_beds = this.specializations[specialization] -= beds
      }
      this.specializations[specialization] = new_beds
      this.reanimate_beds += beds += this.reanimate_beds_hospitals
      this.specializations["reanimate_beds"] = this.reanimate_beds
    }
    else{
      console.log("hai portato tutti i letti in reanimazione")
    }
    this.changings_bed_problems()
  }


  this.changings_bed_problems = () =>{  //non funziona come dovrebbe
    let total_beds = 0
    Object.keys(this.specializations).forEach(key =>{
      if(key !== "beds_possible" && key !== "min" && key !== "level" && key !== "reanimate_beds"){
        total_beds += this.specializations[key]
      }
    })
    this.beds_feeling = (total_beds / this.other_beds)*100   //min 5 max 100
    this.non_virus_dead_rate = 100-this.beds_feeling
    if (this.beds_feeling <= 5) {
      this.beds_feeling = 0
    }
  }

  this.specializations = {
    cardiology_beds : Math.trunc(this.other_beds/7),
    neurology_beds : Math.trunc(this.other_beds/7),
    gynecology_beds : Math.trunc(this.other_beds/7),
    urology_beds : Math.trunc(this.other_beds/7),
    pulmonology_beds : Math.trunc(this.other_beds/7),
    pediatrics_beds : Math.trunc(this.other_beds/7),
    psychiatry_beds : Math.trunc(this.other_beds/7),
    reanimate_beds :this.reanimate_beds,
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
      console.log("economy perc:","-", this.economy_rate,"%")
      console.log(this.economy_judgment)
      console.log("pil rate: ", this.pil_rate)
      console.log("health funds :", this.health_funds)
      console.log("healh funds used: ", this.health_funds_used)
      console.log("pil :", this.pil)
      console.log("beds feeling", this.beds_feeling)
      console.log("new hospitals", this.decision["new_hospitals"])
      console.log("reanimate beds", this.reanimate_beds)
      console.log("need medical", this.need_medical)
      console.log("non virus rate", this.non_virus_dead_rate)
      console.log("dead :" ,this.dead)
      console.log("non virus dead", this.non_virus_dead)
      console.log("virus dead :" ,this.virus_dead)
      console.log("feeling deads", this.feeling_dead)
      console.log("feeling non virus dead",this.feeling_non_virus_dead)
      console.log("riot", this.riot_type)
      console.log("riots", this.riots)
      console.log("loan_expired", this.loan_expired)
      console.log("difficulty", this.difficulty)


  }

  //-------------------------------------
  // Start block section

  this.block_trades=(choice)=>{
    /*
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
    */
    const outcome = [] //[health,feeling,economy]
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
    this.decision["block_trades_e"] = outcome
  }
  

  this.health_funds_calcolate = () => {
    health_funds = Math.round(this.pil * this.health_funds_rate)
    this.health_funds = health_funds - this.health_funds_used + this.health_funds_loan
  }

  //-------------Start loans section------------------

  
  this.make_loan = (date1,amount, interests_paid, interests_not_paid, risk) => {
    if (this.loans.length < 5){
        this.health_funds_loan += amount
        perc = amount/stato.pil
        perc_paid = perc * interests_paid/100
        perc_not_paid = perc * interests_not_paid/100
        this.loans.push(new Loan(date1,amount, perc_paid, perc_not_paid, risk))
    }
    else{
        console.log("hai gia 5 prestiti")
    }
  }


  this.pay_loan = (loan) => {
    this.pil -= loan.perc_paid*this.pil // da controllare matematica
    const index = this.loans.indexOf(loan)
    this.loans.splice(index, 1)

  }

  this.create_date = (risk) => {  
    if (risk === "high"){
      month = world.month_numb + 1
      if (month === 13){
        month = 1
      }
    }
    else if (risk === "low"){
      month = world.month_numb + 2
      if (month === 13){
        month = 1
      }
      else if(month === 14){
        month = 2
      }
    
    }
    month = months[month - 1]
    day = world.curDay
    year = world.curYear
    a = day + month + year
    return a
  }


  // End loans section

  //-------------------------------------

  this.riot=()=>{
    this.riots += 1
    const riot = getRandomInt(1,4)
    console.log("a", riot)
    switch(riot){
      case 1:
        this.riot_type = "infects"
        this.infects += this.infects*(30/100)
        if (this.infects === this.popolation){
          this.infects = this.popolation
        }
        break

      case 2:
        this.riot_type = "both"
        this.infects += this.infects*(15/100)
        this.economy_riot_influence = ((this.pil/this.pil_0 * 100) - ((this.pil-((this.pil_0*(60/3000))))/this.pil_0 * 100))
        this.pil-=(this.pil_0*(60/3000))
        if (this.infects === this.popolation){
          this.infects = this.popolation
        }
        break

      case 3:
        this.riot_type = "economy"
        this.economy_riot_influence = ((this.pil/this.pil_0 * 100) - ((this.pil-((this.pil_0*(100/3000))))/this.pil_0 * 100))
        this.pil-=(this.pil_0*(100/3000))
        break
    }
  }

  this.riot_summary = () => {
    perc = Math.round((100-this.feeling)/20)
    perc = perc / 2
    const riot = getRandomInt(1,101)
    var a = 0
    if (riot <= perc){
      a = 1
    }
    else{
      a = 2
    }
    switch(a){
      case 1:

        this.riot()
    }
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
      this.pil-=(this.pil_0*((this.pil_rate)/3000))
      console.log(this.pil_0*((this.pil_rate)/3000))   //da controllare la matematica


    }
    else if(this.pil_rate===this.rate_economy_daily){
      this.economy_judgment = "uguale economia"
      this.pil-=(this.pil_0*(this.pil_rate/4700))
      console.log(this.pil_0*(this.pil_rate/4700))
    }

    else{
      this.economy_judgment = "migliorata economia"
      const nr=(this.rate_economy_daily-this.pil_rate)
      if (this.pil_rate >= 1.5){
        this.pil+=(this.pil_0*(nr/300))
        console.log(this.pil_0*(nr/300))
      }
    }
    if (this.pil >= this.pil_0){
      this.pil = this.pil_0
    }
    this.rate_economy_daily=this.pil_rate
    this.economy_rate = 100-(this.pil/this.pil_0 *100)
  }

  //--------end updaters------------




  //-----------Start summaries-------------

  this.loan_summary = () => {
    if (this.loans.length != 0){
      this.loans.forEach(currentItem => {
        if (currentItem.date1 === world.date){
          this.economy_loan_influence = ((this.pil/this.pil_0 * 100) - ((this.pil-currentItem.perc_not_paid*this.pil)/this.pil_0 * 100))
          this.pil -= currentItem.perc_not_paid*this.pil // da controllare matematica
          index = stato.loans.indexOf(currentItem)
          this.loans.splice(index, 1)
          this.loan_expired = true
        }
      });
    }
  }

  this.summary_death = () => {
    this.non_virus_death_update()
    let total_death = this.infects * 0.03
    let death = total_death - this.virus_dead
    this.need_medical = Math.round(this.infects * 0.2)
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
    this.virus_dead += death
    this.death_daily = death + this.non_virus_death_daily
    this.dead += this.death_daily
    this.infects -= death
  }


  this.summary_economy = () =>{
    let rate=0
    Object.keys(this.decision).forEach(key =>{
      if (key !== "new_hospitals"){
        if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){
          if (this.decision[key] === true){
            rate += 1
          }
        }
        else if(key === "red_zone"){
          rate+=(this.decision[key][2]/100) *4                            //red zone *4
        }
        else if(key === "block_trades_e"){
          rate+=(this.decision[key][2]/100) *3                             //*3
        }
        else if (key === "shops_opened" || key === "companies_opened"){
          rate+=(this.decision[key][2]/100) *2                            // *2
        }
        else if (key === "schools_opened" || key === "museums_opened" || key === "ports_opened" || key === "airports_opened" || key === "sports_allowed"){
          rate+=(this.decision[key][2]/100)                               //*1
        }
      }
    })
    rate = rate / 2
    this.pil_rate = rate
    this.economy_update()
  }

  this.summary_feeling=() =>{
    let sum=0
    c=0
    Object.keys(this.decision).forEach(key => {
      if (key !== "new_hospitals"){
        if (key === "red_zone"){
          sum += (this.decision[key][1])*4                  //red_zone *4
          c += 4
        }
        else if (key === "shops_opened" || key === "airports_opened" || key === "sports_allowed" || key === "companies_opened"){
          sum += (this.decision[key][1]) *2                  //2*
          c += 2
        }
        else if (key === "schools_opened" || key === "museums_opened" || key === "ports_opened" || key === "block_trades_e"){
          sum += (this.decision[key][1])                    //*1
          c += 1
        }
        else if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){
          if (this.decision[key] === false){
            sum += 100                                      //true = 100, false = 0
          }
          c += 1
        }
      }
    })
    sum += this.beds_feeling*2
    c+=2
    this.feeling_dead = 100-((this.dead / (this.popolation * 0.05)) * 100)
    if (this.feeling_dead < 0) {
      this.feeling_dead = 0
    }
    sum += this.feeling_dead*4
    if (this.feeling_dead < 0){
      this.feeling_dead = 0
    }
    c += 4
    this.feeling_non_virus_dead = 100-((this.non_virus_dead / 100) * 100)
    if (this.feeling_non_virus_dead < 0){
      this.feeling_non_virus_dead = 0
    }   
    sum += this.feeling_non_virus_dead*4
    c += 4
    this.feeling = sum / c
    if (this.feeling < 5){
      this.feeling = 0
    }
  }


  this.summary_infect =() =>{
    if (this.difficulty === "easy"){
      this.rate_0 = 1
    }
    else if (this.difficulty === "normal"){
      this.rate_0 = 1.5
    }
    else if (this.difficulty === "extreme"){
      this.rate_0 = 2
    }
    if (this.infects / this.popolation * 100 > 50){ 
      if (this.difficulty === "easy"){
        this.rate_0 = 0.25
      }
      else if (this.difficulty === "normal"){
        this.rate_0 = 0.5
      }
      else if (this.difficulty === "extreme"){
        this.rate_0 = 0.75
      }      
    }
    var rate = this.rate_0
    rate += 2.5
    Object.keys(this.decision).forEach(key =>{
      if (key !== "new_new_hospitals"){
        if (key === "mandatory_masks" || key === "army_using" || key === "close_stock"){    //bool
          if (this.decision[key] === true){
            rate -= 0.5 
          }
          else if(this.decision[key] === false){
            rate += 0.5
          }
        } 
        else if(key === "red_zone"){                                                        //red zone 4*
          rate += ((100-this.decision[key][0])/100)*4
        }
        else if (key === "schools_opened" || key === "shops_opened" || key === "airports_opened" || key === "companies_opened"){
          rate += (this.decision[key][0]/100)*2                                                 
        }                                                                                  //2*
        else if (key === "museums_opened" || key === "ports_opened" || key === "sports_allowed" || key === "block_trades_e"){
          rate += (this.decision[key][0]/100)
        }
      }
    })
    if (this.infects / this.popolation * 100 < 50){
      rate = rate/2
    }
    else if (this.infects / this.popolation * 100 > 50 && this.infects / this.popolation * 100 < 80){
      rate = rate/4
    }
    else if (this.infects / this.popolation * 100 > 80){
      rate = rate/8
    }
    if (rate < this.rate_0){
      rate = this.rate_0
    }
    this.infection_rate = rate
    this.infect()
  }

  this.win_date = () => {
    if (this.difficulty === undefined){
      this.difficulty = "normal"
    }
    var date = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day  = ""
    var month = ""
    var year = ""
    if (this.difficulty === "easy"){
      day = date.getDate()
      month = months[date.getMonth() + 6]
      year = date.getFullYear()
    }
    else if (this.difficulty === "normal"){
      day = date.getDate()
      month = months[date.getMonth()]
      year = date.getFullYear() + 1
    }
    else if (this.difficulty === "extreme"){
      day = date.getDate()
      month = months[date.getMonth() + 6]
      year = date.getFullYear() + 1
    }
    this.win_date = day + " " + month + " " + year
  }

  this.summaries=()=>{
    this.summary_economy()
    this.summary_feeling()
    this.health_funds_calcolate()
    this.loan_summary()
    this.riot_summary()
    this.summary_infect()
    this.summary_death()
  }
}

state1 = "italia"
dicto_state = states[state1]
world = new World(dicto_state)
let stato = world.state
stato.win_date()

