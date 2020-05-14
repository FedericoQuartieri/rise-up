/*
const dec={
    schools_opened : [100, 100,0],
    museums_opened : [100, 100,0],
    shops_opened : [100, 100,0],
    ports_opened : [100, 100,0],
    airports_opened : [100, 100,0],
    sports_allowed : [100, 100,0],
    remote_working_companies : [100, 100,0],
    companies_opened : [100, 100,0],
    red_zone : [0, 100,0],
    mandatory_masks : [false, 100, null],
    army_using : [false, 100,0],
    new_hospitals : [0, null,0],
    close_stock: [false],
    block_trades_e: [0,0,0]
  }
*/

const drawing_tools={
    "display_decisions": 
     {
        draw:(dictionary,container_out,state)=>{
            const container=document.createElement("div")
            container.setAttribute("class","div-menu")
            const list=document.createElement("ul")
            list.setAttribute("class","decision-menu")  
            Object.keys(dictionary).forEach((key)=>{
                let curDec=document.createElement("li")
                $(curDec).attr({
                    "class":"decision-toUpdate",
                })
                //curDec.innerHTML=key.replace(/_/g," ")+ ": " + (dec[key][0])
                let displayer=document.createElement("span")
                displayer.setAttribute("id",key+" toUpdate")
                displayer.setAttribute("class","text-inner")
                displayer.innerHTML=key.replace(/_/g," ")+ ": "+dictionary[key][0]+"%"
                curDec.appendChild(displayer)
        
                const showUpmenu=document.createElement("ul")
                showUpmenu.setAttribute("class","showUpmenu")
                for(let i=0;i<6;i++){
                    let curSelector=document.createElement("li")
                    $(curSelector).attr({
                        "class":"level-selector",
                    })
                    let level=i
                    curSelector.innerHTML=level
                    curSelector.addEventListener("click",()=>state.make_decision(key,level))
                    showUpmenu.appendChild(curSelector)
                }
        
                curDec.appendChild(showUpmenu)
                list.appendChild(curDec)
            })
            container.appendChild(list)
            container_out.appendChild(container)
        },
        update : (dictionary) =>{
            Object.keys(dictionary).forEach(key =>{
              document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+dictionary[key][0]+"%"
            })
        },
        update_dicto : (state) => {
            Object.keys(state.decision).forEach(key =>{
                if (key !== "red_zone" && key !== "block_trades_e" && key !== "mandatory_masks" && key !== "army_using" && key !== "close_stock" && key !== "new_hospitals")
                    state.decision_dictonary[key] = state.decision[key]
            })
        }
    },
    "display_boolean":
    {
        draw:(decisionString,dictionary,container_out)=>{
    
            const div=document.createElement("div")
            const display=document.createElement("p")
            display.setAttribute("class","switch-display")
            display.innerHTML=decisionString.replace(/_/g," ")
            div.setAttribute("class","c")
            div.appendChild(display)
            const label=document.createElement("label")
            const input=document.createElement("input")
            const s=document.createElement("span")
            input.setAttribute("type","checkbox")
            label.appendChild(input)
            label.appendChild(s)
            s.setAttribute("class","check")
            div.appendChild(label)
            container_out.appendChild(div)
            label.addEventListener("change",(e)=>{
            if(input.checked){
                div.setAttribute("class","ca")
                dictionary[decisionString]=true
            }
            else{
                div.setAttribute("class","c")
                dictionary[decisionString]=false
            }
        
            })
        }
    },
    "display_red_zone" : {
        draw : (reference,container_out)=>{
    
            const div=document.createElement("div")
            div.setAttribute("id","wrap")
            const header=document.createElement("h2")
            header.setAttribute("id","rangeValue")
            const fill=document.createElement("div")
            fill.setAttribute("id","fillRangeValue")
            const input=document.createElement("input")
        
            $(input).attr({
            "type":"range",
            "class":"range",
            "name":"",
            "value":0,
            "min":0,
            "max":100,
            //"onmousemove":"",
            //"onChange":"rangeSlider(this.value)"
        
            })
            div.appendChild(header)
            div.appendChild(fill)
            div.appendChild(input)
            container_out.appendChild(div)
        
           
            input.addEventListener("mousemove", function rangeSlider(){
                reference[0]=parseInt(this.value)
                reference[1]=100-(parseInt(this.value))
                reference[2]=parseInt(this.value)
                document.getElementById("rangeValue").innerHTML=this.value
                document.getElementById("fillRangeValue").style.width=+this.value+"%"
            })
            input.addEventListener("change", function rangeSlider(){
                reference[0]=parseInt(this.value)
                reference[1]=100-(parseInt(this.value))
                reference[2]=parseInt(this.value)
                document.getElementById("rangeValue").innerHTML=this.value
                document.getElementById("fillRangeValue").style.width=+this.value+"%"
            })
        
            
            
        }
    },

    "display_specializations" : {
        draw : (dictionary,container_out, state) =>{

            var i = 0
            pop = ()=>{
                if (i === 0){
                    document.getElementById("item1").style.transform = "translateX(-50px)"
                    document.getElementById("item2").style.transform = "translate(-35px, 35px)"
                    document.getElementById("item3").style.transform = "translateY(60px)"
                    document.getElementById("item4").style.transform = "translate(35px, 35px)"
                    document.getElementById("item5").style.transform = "translateX(50px)"
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

            const container=document.createElement("div")
            container.setAttribute("class","spec-menu")

            const flex_container = document.createElement("div")
            container.appendChild(flex_container)
            flex_container.setAttribute("class", "flex-container")
            const reanimate_beds = document.createElement("div")
            flex_container.appendChild(reanimate_beds)
            reanimate_beds.setAttribute("class", "reanimate-beds")
            reanimate_beds.setAttribute("id", "reanimate-beds")
            reanimate_beds.innerHTML = "Total beds: \n" + dictionary["reanimate_beds"]
            const button = document.createElement("div") 
            flex_container.appendChild(button)
            button.setAttribute("class", "require-beds")
            button.setAttribute("id", "require-beds")
            button.addEventListener("click", pop)
            a = document.createElement("p")
            button.appendChild(a)
            a.setAttribute("class", "spec-button")
            a.innerHTML = "+"
            const items = document.createElement("div")
            flex_container.appendChild(items)
            items.setAttribute("class", "require-menu-items")
            for (i = 0;i<5;i++){
                center = document.createElement("center")
                const item = document.createElement("div")
                items.appendChild(item)
                item.setAttribute("class", "item"+(i+1))
                item.setAttribute("id", "item"+(i+1))
                item.addEventListener("click", function(){state.make_change_bed(this.textContent)})
                item.appendChild(center)
                const number = document.createElement("p")
                center.appendChild(number)
                number.setAttribute("class", "fa")
                number.innerHTML = dictionary["level"] * (i+1)
            }
            container_out.appendChild(container)
            
        },
        update : (dictionary) => {
            Object.keys(dictionary).forEach(key =>{
                if (key !== "level" && key !== "min"){
                    if (key !== "reanimate_beds"){
                        /*document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+ dictionary[key]*/
                    }
                    else if (key === "reanimate_beds"){
                        document.getElementById("reanimate-beds").innerHTML = "Total beds : " + dictionary[key]
                    }
                }
            })
        } 
    },
    "display_funds" : {
        draw : (container_out, state) => {
            const container = document.createElement("div")
            container_out.appendChild(container)
            const show_funds = document.createElement("div")
            container.setAttribute("class", "funds-menu")
            container.appendChild(show_funds)
            show_funds.setAttribute("class", "show_funds")
            show_funds.setAttribute("id", "show_funds")
            show_funds.innerHTML = "health_funds: " + state.health_funds
        },
        update : (state) => {
            document.getElementById("show_funds").innerHTML = "health_funds: " + state.health_funds
        }
    },

    "display_loans" : {
        draw : (container_out, state) =>{
            const container = document.createElement("div")
            container.setAttribute("class", "loans_menu")
            container_out.appendChild(container)
            const make_loan_div = document.createElement("div")
            container.appendChild(make_loan_div)
            make_loan_div.setAttribute("class", "loans_buttons")
            const h=document.createElement("div")
            h.setAttribute("class","title")
            h.innerHTML="Make Loans BCE"
            make_loan_div.appendChild(h)
            const buttons_wrap=document.createElement("div")
            buttons_wrap.setAttribute("class","buttons_wrap")
            make_loan_div.appendChild(buttons_wrap)
            const low_risk = document.createElement("button")
            low_risk.innerHTML = "low risk"
            low_risk.setAttribute("id", "make-loan-low")
            low_risk.addEventListener("click" , function(){state.make_loan(state.create_date("low"), 10000000000, 10, 50, "low");drawing_tools.display_loans.update_internal(state)})
            buttons_wrap.appendChild(low_risk)
            const high_risk = document.createElement("button")
            high_risk.innerHTML = "high risk"
            high_risk.setAttribute("id", "make-loan-high")
            high_risk.addEventListener("click" , function(){state.make_loan(state.create_date("high"), 20000000000, 20, 100, "high");drawing_tools.display_loans.update_internal(state)})
            buttons_wrap.appendChild(high_risk)

            const show_loans = document.createElement("div")
            show_loans.setAttribute("class", "loans")
            const title=document.createElement("h2")
            title.setAttribute("class","header")
            title.innerHTML="Loans"
            show_loans.appendChild(title)
            container.appendChild(show_loans)
            const list = document.createElement("ul")
            list.setAttribute("class", "loans-list")
            show_loans.appendChild(list)
            for(let i= 0;i<5;i++){
                const loan = document.createElement("li")
                loan.setAttribute("id", "loan"+(i+1))
                loan.setAttribute("class", "inactive")
                list.appendChild(loan)
            }
        },
        update_internal : (state) =>{
            if (state.loans.length !== 0){
                for (let i = 0;i<state.loans.length;i++){
                    month = state.world.from_date_to_month(state.loans[i].date1)
                    month = months[month - 1]
                    day = state.world.from_date_to_day(state.loans[i].date1)
                    year = state.world.from_date_to_year(state.loans[i].date1)
                    date = day + " " + month + " " + year + " "
                    document.getElementById("loan"+ (i+1)).setAttribute("class", "active")
                    document.getElementById("loan"+ (i+1)).innerHTML = "expires: " + date + "risk: " + state.loans[i].risk  + " "+ "<span><button id = 'pay-loan-to-setup' class ='pay-loan'>Pay</button><span>"
                    const pay_loan = document.getElementById("pay-loan-to-setup")
                    pay_loan.setAttribute("id", "pay-loan"+(i+1))
                    pay_loan.addEventListener("click", function(){state.pay_loan(state.loans[this.parentElement.parentElement.id.substring(4)- 1]);drawing_tools.display_loans.update_internal(state)})
                }
                for (let i = state.loans.length;i<5;i++){
                    document.getElementById("loan"+(i+1)).innerHTML = ""

                }
            }
            else {
                for (let i = 0;i<5;i++){
                    document.getElementById("loan"+ (i+1)).innerHTML = ""
                }
            }
            for (let i = 0;i<5;i++){
                loan = document.getElementById("loan"+ (i+1))
                if (loan.textContent === ""){
                    loan.setAttribute("class", "inactive")
                }
            }
        },
        update : (state) => {
            if (state.loan_expired){
                drawing_tools.display_loans.update_internal(state)
                state.loan_expired = false
            }
        }
    },
    "display_hospitals" : {
        draw : (container_out, state) => {
            const container = document.createElement("div")
            container_out.appendChild(container)
            container.setAttribute("class", "hospitals-menu")
            const h=document.createElement("div")
            h.setAttribute("class","title")
            h.innerHTML="beds & hospitals"
            container.appendChild(h)
            const add_hospitals = document.createElement("button")
            
            add_hospitals.setAttribute("class", "hospital_button")
            
            add_hospitals.innerHTML = "<span>build hospitals</span>"
            add_hospitals.addEventListener("click", function(){if (state.health_funds - 1000000000 >= 0) {state.make_new_hospital()} else{/*alert*/}})
            const new_hospitals = document.createElement("span")
            container.appendChild(new_hospitals)
            container.appendChild(add_hospitals)

            new_hospitals.setAttribute("class", "show-new-hospitals")
            new_hospitals.setAttribute("id", "show-new-hospitals")
            new_hospitals.innerHTML = "new hospitals: " + state.decision["new_hospitals"]
            
            
        },
        update : (state) => {
            const new_hospitals = document.getElementById("show-new-hospitals")
            new_hospitals.innerHTML = "new hospitals: " + state.decision["new_hospitals"]
            
            var free_beds = state.reanimate_beds - state.need_medical
            var beds_needed = 0
            if (free_beds < 0){
                var beds_needed = -free_beds
                free_beds = 0
            }
            free_beds = Math.round(free_beds)
            document.getElementById("show_free_beds").innerHTML = "Not used beds: " + free_beds 
            document.getElementById("show_need").innerHTML= "People in medical need: " + beds_needed
                       

        }
    },
    "display_beds_stats":{
        draw: (container_out,state)=>{
            const wrap=document.createElement("div")
            wrap.setAttribute("class","wrap_beds")
            const show_beds = document.createElement("div")
            const s1=document.createElement("div")
            wrap.appendChild(s1)
            s1.setAttribute("class","separator")
            s1.setAttribute("id","st")
            const show_need=document.createElement("div")
            show_need.setAttribute("id", "show_need")
            
            show_beds.setAttribute("class", "show_free_beds")
            show_beds.setAttribute("id", "show_free_beds")
            var free_beds = state.reanimate_beds - state.need_medical
            var beds_needed = 0
            if (free_beds < 0){
                var beds_needed = -free_beds
                free_beds = 0
            }
            free_beds = Math.round(free_beds)
            show_beds.innerHTML = "Not used beds: " + free_beds 
            show_need.innerHTML= "People in medical need: " + beds_needed
            wrap.appendChild(show_beds)
            wrap.appendChild(show_need)
            const s2=document.createElement("div")
            wrap.appendChild(s2)
            s2.setAttribute("class","separator")
            s2.setAttribute("id","sb")
            container_out.appendChild(wrap)
        }
    },
    "display_counters" :{
        draw : (infects,economy,feeling,deaths,container_out)=>{
            const container=document.createElement("div")
            container.setAttribute("class","container_counters")
            for(let i=0;i<3;i++){
        
        const card=document.createElement("div")
        card.setAttribute("class","card")
        
        const box=document.createElement("div")
        box.setAttribute("class","box")
        
        const perc=document.createElement("div")
        perc.setAttribute("class","percent")
    
        const svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        
        perc.appendChild(svg)
        const h2=document.createElement("h2")
        h2.setAttribute("id","display "+i)
    
        if(i===0){
            h2.innerHTML=infects
        }
        else if(i===1){
            h2.innerHTML=economy
        }
        else{
            h2.innerHTML=feeling
        }
    
        for(let j=0;j<2;j++){
            const circle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
            $(circle).attr({
                "cx":"70",
                "cy":"70",
                "r":"70"
                })
            
            if(j===1){
                circle.setAttribute("id","circle "+i)
                circle.style.cssText=" stroke-dashoffset:"+ " calc(440 - (440 * "+ h2.innerHTML+ " ) /100) ;"
                //console.log(h2.innerHTML)
            } 
            
            svg.appendChild(circle)
        }
    
    
        const number=document.createElement("div")
        number.setAttribute("class","number")
        perc.appendChild(number)
    
        const perc_graph=document.createElement("span")
        perc_graph.setAttribute("class","perc_graph")
        perc_graph.innerHTML="%"
        
    
        
        number.appendChild(h2)
    
        
        h2.appendChild(perc_graph)
    
    
        const header=document.createElement("h2")
        header.setAttribute("class","text")
        
        if(i===0){

            header.innerHTML="infects"
            const show=document.createElement("div")
            show.setAttribute("id","infects-number")
            header.appendChild(show)
    
        }
        else if(i===1){
            header.innerHTML="economy"
    
        }
        else{
            header.innerHTML="feeling"
    
        }
        
            
    
        box.appendChild(perc)
        box.appendChild(header)
        
        card.appendChild(box)
        container.appendChild(card)
    
        
        }
        const w=document.createElement("div")
        w.setAttribute("class","wrap_deaths")
        const container_deaths=document.createElement("div")
        container_deaths.setAttribute("class","container_deaths")
        const ic=document.createElement("i")
        ic.setAttribute("class","fa fa-exclamation-triangle fa-3x")
        const disp=document.createElement("div")
        disp.setAttribute("id","death_display")
        disp.innerHTML=deaths
        const p=document.createElement("p")
        p.setAttribute("class","count_text")
        p.innerHTML="deaths"



        container_deaths.appendChild(ic)
        container_deaths.appendChild(disp)
        container_deaths.appendChild(p)
        w.appendChild(container_deaths)

        container_out.appendChild(container)
        container_out.appendChild(w)
    
        
    
        },
        update :(infects_number,infects,economy,feeling,deaths) =>{
            
            const show=document.getElementById("infects-number")
            if(infects<5){
                show.innerHTML = infects_number
            }
            else{
                show.innerHTML = ""
            }
            
            for(let i=0;i<3;i++){
                const curPar=document.getElementById("display "+i).innerHTML.replace("<span class=\"perc_graph\">%</span>","")
                if(i===0){
                    document.getElementById("display "+i).innerHTML=document.getElementById("display "+i).innerHTML.replace(curPar,parseFloat(infects).toFixed(1)) 
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(440 - (440 * "+ infects+ " ) /100) ;"
        
                }
                else if(i===1){
                    document.getElementById("display "+i).innerHTML=document.getElementById("display "+i).innerHTML.replace(curPar,parseFloat(economy).toFixed(1)) 
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(440 - (440 * "+ economy+ " ) /100) ;"
                }
                else{
                    document.getElementById("display "+i).innerHTML=document.getElementById("display "+i).innerHTML.replace(curPar,parseFloat(feeling).toFixed(1)) 
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(440 - (440 * "+ feeling+ " ) /100) ;"
                }
                
                
        
            }
            document.getElementById("death_display").innerHTML=deaths
        }
    },
    display_stop : (container_out) =>{

        _1x_function = () => {if (currentLoop !== null){clearInterval(currentLoop)};daytime = 1; var timerClock = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock}
        _05x_function = () => {clearInterval(currentLoop);daytime = .5; var timerClock0 = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock0}
        _2x_function = () => {clearInterval(currentLoop);daytime = 20;var timerClock2 = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock2}
        
        const container = document.createElement("div")
        container_out.appendChild(container)
        container.setAttribute("class", "speed-menu")
        const stop_button = document.createElement("button")
        container.appendChild(stop_button)
        stop_button.innerHTML = "stop"
        stop_button.setAttribute("id", "stop-button")
        stop_button.setAttribute("class", "stop-button")
        stop_button.addEventListener("click", function(){clearInterval(currentLoop);currentLoop = null})

        const _1x_span = document.createElement("span")
        container.appendChild(_1x_span)
        const _1x_button = document.createElement("button")
        _1x_span.appendChild(_1x_button)
        _1x_button.innerHTML = "1X"
        _1x_button.setAttribute("id", "1x-button")
        _1x_button.setAttribute("class", "1x-button")
        _1x_button.addEventListener("click", _1x_function)
       
        const _05x_span = document.createElement("span")
        container.appendChild(_05x_span)
        const _05x_button = document.createElement("button")
        _05x_span.appendChild(_05x_button)
        _05x_button.innerHTML = "0.5X"
        _05x_button.setAttribute("id", "05x-button")
        _05x_button.setAttribute("class", "05x-button")
        _05x_button.addEventListener("click", _05x_function)
        
        const _2x_span = document.createElement("span")
        container.appendChild(_2x_span)
        const _2x_button = document.createElement("button")
        _2x_span.appendChild(_2x_button)
        _2x_button.innerHTML = "2X"
        _2x_button.setAttribute("id", "2x-button")
        _2x_button.setAttribute("class", "2x-button")
        _2x_button.addEventListener("click", _2x_function)
    },
    continue : (state) => {
        if (state.infects >= state.popolation || state.feeling === 0 || state.pil === state.pil_0*0.3){
            clearInterval(currentLoop)
            clearInterval(gameLoop)
            location.href = "loose.html"
        }
        else if (state.world.curYear === (state.world.initial_year + 1)){
            clearInterval(currentLoop)
            clearInterval(gameLoop)
            location.href = "win.html"
        }
    },
    display_date : {
        draw : (container_out, world)  => {
            const container = document.createElement("div")
            container_out.appendChild(container)
            const date = document.createElement("div")
            container.appendChild(date)
            date.setAttribute("id", "date")
            date.setAttribute("class", "date")
            date.innerHTML = world.date
        },
        update : (world) => {
            document.getElementById("date").innerHTML = world.date
        }
    }
}



// -------funzioni per spec ----------




//drawing_tools["display_decisions"].draw(dec,document.body) la chiami così poi devo mettere il make decisions quindi bisognerà passargli anche lo stato nel main

//chiami il draw solo una volta poi update
    