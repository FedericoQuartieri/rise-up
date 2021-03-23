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

const close_button = null

const drawing_tools={

    "display_decisions": 
     {
        draw:(dictionary,container_out,state)=>{
            const container=document.createElement("div")
            container.setAttribute("class","div-menu")
            const h=document.createElement("div")
            h.setAttribute("class","title")
            h.setAttribute("id","dec_title")
            h.innerHTML="decisions opening"
            container.appendChild(h)
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
                    curSelector.addEventListener("click",()=>state.make_decision(key,5-level))
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
    "display_booleans" : {
        draw : (state,container_out)=>{
            const wrapper=document.createElement("div")
            wrapper.setAttribute("class","wrap_booleans")
            const h=document.createElement("div")
            h.setAttribute("class","title")
            h.innerHTML="extra moves"
            wrapper.appendChild(h)
            drawing_tools.display_boolean.draw("close_stock",state.decision,wrapper)
            drawing_tools.display_boolean.draw("mandatory_masks",state.decision,wrapper)
            drawing_tools.display_boolean.draw("army_using",state.decision,wrapper)
            container_out.appendChild(wrapper)

        }

    },
    "display_red_zone" : {
        draw : (reference,container_out)=>{
    
            const div=document.createElement("div")
            div.setAttribute("id","wrap")
            const h=document.createElement("div")
            h.setAttribute("class","title")
            h.setAttribute("id","red")
            h.innerHTML="red zone"
            container_out.appendChild(h)
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

            const container=document.createElement("div")
            container.setAttribute("class","spec-menu")

            const flex_container = document.createElement("div")
            container.appendChild(flex_container)
            flex_container.setAttribute("class", "flex-container")
            const reanimate_beds = document.createElement("div")
            flex_container.appendChild(reanimate_beds)
            reanimate_beds.setAttribute("class", "reanimate-beds")
            reanimate_beds.setAttribute("id", "reanimate-beds")
            reanimate_beds.innerHTML = "beds usable : "+ drawing_tools.display_numbers(dictionary["reanimate_beds"])
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
                item.addEventListener("click", function(){state.make_change_bed(parseInt(this.id[this.id.length-1])*dictionary["level"])})
                item.appendChild(center)
                const number = document.createElement("p")
                center.appendChild(number)
                number.setAttribute("class", "fa")
                number.innerHTML = drawing_tools.display_numbers(dictionary["level"] * (i+1))
            }
            container_out.appendChild(container)
            
        },
        update : (dictionary) => {
            document.getElementById("reanimate-beds").innerHTML = "beds usable : " + drawing_tools.display_numbers(dictionary["reanimate_beds"])
            // qui metti l'update di show specialization del modal e stai solo zitto 
        } 
    },

    "display_funds" : {
        draw : (container_out, state) => {
            const container = document.createElement("div")
            container_out.appendChild(container)
            let health_funds = state.health_funds
            let debit = 0
            if (health_funds < 0){
                debit =  -health_funds
            }
            /*
            const s1=document.createElement("div")
            container.appendChild(s1)
            s1.setAttribute("class","separator")
            s1.setAttribute("id","st")
            */
            const flex_funds = document.createElement("div")
            flex_funds.setAttribute("class", "flex-funds")
            container.appendChild(flex_funds)
            const show_funds = document.createElement("div")
            container.setAttribute("class", "funds-menu")
            flex_funds.appendChild(show_funds)
            show_funds.setAttribute("class", "show_funds")
            show_funds.setAttribute("id", "show_funds")
            const logo = document.createElement("div")
            flex_funds.appendChild(logo)
            logo.setAttribute("class", "logo-funds")
            logo.setAttribute("id", "logo-funds")
            /*
            const s2=document.createElement("div")
            container.appendChild(s2)
            s2.setAttribute("class","separator")
            s2.setAttribute("id","sb")
            */
            if (health_funds >= 0){
                show_funds.innerHTML = "health funds: "+ drawing_tools.display_numbers(health_funds)
            }
            else {
                show_funds.innerHTML = "debit health funds: " + drawing_tools.display_numbers(debit)
            }
        },
        update : (state) => {
            let health_funds = state.health_funds
            let debit = 0
            if (health_funds < 0){
                debit =  -health_funds
            }
            if (health_funds >= 0){
                document.getElementById("show_funds").innerHTML = "health funds: " + drawing_tools.display_numbers(health_funds)
                document.getElementById("logo-funds").style.backgroundColor = "#3f8efc"
            }
            else {
                document.getElementById("show_funds").innerHTML = "debit health funds: " + drawing_tools.display_numbers(debit)
                document.getElementById("logo-funds").style.backgroundColor = "#59f8e8"
            }
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
            low_risk.addEventListener("click" , function(){state.make_loan(state.create_date("low"), 100000000000, 9, 40, "low");drawing_tools.display_loans.update_internal(state)})
            buttons_wrap.appendChild(low_risk)
            const high_risk = document.createElement("button")
            high_risk.innerHTML = "high risk"
            high_risk.setAttribute("id", "make-loan-high")
            high_risk.addEventListener("click" , function(){state.make_loan(state.create_date("high"), 200000000000, 15, 80, "high");drawing_tools.display_loans.update_internal(state)})
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
                    console.log(state.loans[i].date1)
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
                document.getElementById("exampleModalLongTitle").innerHTML = "LOAN"
                document.getElementById("modal-body").innerHTML = "loan expired <br>" + "pil has decreased of " + state.economy_loan_influence.toFixed(1) + "%"
                $('#exampleModalCenter').modal('show')
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
            add_hospitals.addEventListener("click", function(){if (state.health_funds - 1000000000 >= 0) {state.make_new_hospital()}})
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
        }
    },
    "display_beds_stats":{
        draw: (container_out,state)=>{

            show_specialization = () => {
                const div = document.createElement("div")
                div.setAttribute("class", "specializations-wrap")
                const list = document.createElement("ul")
                div.appendChild(list)
                Object.keys(state.specializations).forEach(key =>{
                    if (key !== "reanimate_beds" && key !== "min" && key !== "level"){
                        const item = document.createElement("li")
                        var min = ""
                        if (state.specializations[key] - 50 <= state.specializations["min"]){
                            min = " (min)"
                        }
                        item.innerHTML = key.replace("_", " ")  + ": " + state.specializations[key]+ min
                        list.appendChild(item)
                    }
                })
                document.getElementById("exampleModalLongTitle").innerHTML = "SPECIALITIES"
                document.getElementById("modal-body").innerHTML = "<p>Attention!</p>" + "<br>Every bed you add to beds usable will be taken from specialities, this action is irreversible</br>"
                document.getElementById("modal-body").appendChild(div)
                document.getElementById("modal-body").removeChild(document.getElementById("modal-body").childNodes[0])
                document.getElementById("modal-body").appendChild(div)
                $('#exampleModalCenter').modal('show')

            }

            const wrap=document.createElement("div")
            wrap.setAttribute("class","wrap_beds")
            const s1=document.createElement("div")
            wrap.appendChild(s1)
            s1.setAttribute("class","separator")
            s1.setAttribute("id","st")
            const show_beds = document.createElement("div")
            show_beds.setAttribute("class", "show_free_beds")
            show_beds.setAttribute("id", "show_free_beds")
            
            const show_need=document.createElement("div")
            show_need.setAttribute("id", "show_need")
            /*
            const show_other = document.createElement("div")
            show_other.setAttribute("id", "show_other")
            */
            const show_spec = document.createElement("div")
            show_spec.setAttribute("class", "show_spec" )
            const spec_visual=document.createElement("span")
            spec_visual.setAttribute("id","spec_visual")
            spec_visual.innerHTML="specialities beds"
            show_spec.appendChild(spec_visual)

            const show_spec_button = document.createElement("button")
            show_spec_button.setAttribute("class", "show-spec-button")
            show_spec.appendChild(show_spec_button)
            const icon=document.createElement("img")
            icon.setAttribute("src","./icon.svg")
            icon.setAttribute("id","icon")
            show_spec_button.appendChild(icon)
            
            show_spec_button.addEventListener("click", show_specialization)
            
            var free_beds = state.reanimate_beds - state.need_medical
            var beds_needed = 0
            if (free_beds < 0){
                var beds_needed = -free_beds
                free_beds = 0
            }
            free_beds = Math.round(free_beds)
            var other_beds = 0
            Object.keys(state.specializations).forEach((key)=>{
                if (key !== "reanimate_beds" && key !== "min" && key !== "level"){
                    other_beds += state.specializations[key]
                }
            })
            other_beds -= state.specializations["min"]*7
            //show_other.innerHTML = "Available beds: " + drawing_tools.display_numbers(other_beds)
            show_beds.innerHTML = "Not used beds: " + drawing_tools.display_numbers(free_beds)
            show_need.innerHTML= "People in medical need: " + drawing_tools.display_numbers(beds_needed)
        
            wrap.appendChild(show_beds)
            //wrap.appendChild(show_other)
            wrap.appendChild(show_spec)
            wrap.appendChild(show_need)
            
            const s2=document.createElement("div")
            wrap.appendChild(s2)
            s2.setAttribute("class","separator")
            s2.setAttribute("id","sb")
            container_out.appendChild(wrap)


        },
        update : (state) => {
            var free_beds = state.reanimate_beds - state.need_medical
            var beds_needed = 0
            if (free_beds < 0){
                var beds_needed = -free_beds
                free_beds = 0
            }
            var other_beds = 0
            Object.keys(state.specializations).forEach((key)=>{
                if (key !== "reanimate_beds" && key !== "min" && key !== "level"){
                    other_beds += state.specializations[key]
                }
            })
            other_beds -= (state.specializations["min"]*7)
            free_beds = Math.round(free_beds)
            //document.getElementById("show_other").innerHTML = "Other  beds : " + drawing_tools.display_numbers(other_beds)
            document.getElementById("show_free_beds").innerHTML = "Not used beds: " + drawing_tools.display_numbers(free_beds) 
            document.getElementById("show_need").innerHTML= "People in medical need: " + drawing_tools.display_numbers(beds_needed)
        }
    },
    "display_counters" :{
        draw : (infects,economy,feeling,deaths,state,container_out)=>{
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
                "cx":"8.5vh",
                "cy":"8.5vh",
                "r":"8vh"
                })
            
            if(j===1){
                circle.setAttribute("id","circle "+i)
                circle.style.cssText=" stroke-dashoffset:"+ " calc(50vh - (50vh * "+ h2.innerHTML+ " ) /100) ;"
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

        const det=document.createElement("div")
        det.setAttribute("id","other")
        for(let i=0;i<2;i++){
            const pa=document.createElement("p")
            
            if(i===0){
                pa.setAttribute("id","vd-inner")
                pa.innerHTML="Virus deaths : "+(state.virus_dead)

            }
            else{
                pa.setAttribute("id","nvd-inner")
                pa.innerHTML="Non virus deaths : "+state.non_virus_dead
            }
            det.appendChild(pa)
        }
       



        container_deaths.appendChild(ic)
        container_deaths.appendChild(disp)
        container_deaths.appendChild(p)
        container_deaths.appendChild(det)
        w.appendChild(container_deaths)

        container_out.appendChild(container)
        container_out.appendChild(w)
    
        
    
        },
        update :(infects_number,infects,economy,feeling,deaths,state) =>{
            
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
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(50vh - (50vh * "+ infects+ " ) /100) ;"
        
                }
                else if(i===1){
                    document.getElementById("display "+i).innerHTML=document.getElementById("display "+i).innerHTML.replace(curPar,parseFloat(economy).toFixed(1)) 
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(50vh - (50vh * "+ economy+ " ) /100) ;"
                }
                else{
                    document.getElementById("display "+i).innerHTML=document.getElementById("display "+i).innerHTML.replace(curPar,parseFloat(feeling).toFixed(1)) 
                    document.getElementById("circle "+i).style.cssText=" stroke-dashoffset:"+ " calc(50vh - (50vh * "+ feeling+ " ) /100) ;"
                }
                
                
        
            }
            document.getElementById("death_display").innerHTML=deaths
            document.getElementById("vd-inner").innerHTML="Virus deaths : "+(state.dead-state.non_virus_dead)
            document.getElementById("nvd-inner").innerHTML="Non virus deaths : "+state.non_virus_dead
        }
    },
    display_stop : (container_out) =>{

        _1x_function = () => {clearInterval(currentLoop);daytime = 1; var timerClock = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock}
        _05x_function = () => {clearInterval(currentLoop);daytime = .5; var timerClock0 = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock0}
        _2x_function = () => {clearInterval(currentLoop);daytime = 2;var timerClock2 = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime);currentLoop = timerClock2}
        
        const container = document.createElement("div")
        container_out.appendChild(container)
        container.setAttribute("class", "speed-menu")
        const stop_button = document.createElement("button")
        container.appendChild(stop_button)
        stop_button.innerHTML = "stop"
        stop_button.setAttribute("id", "stop-button")
        stop_button.setAttribute("class", "speed-button")
        stop_button.addEventListener("click", function(){clearInterval(currentLoop);currentLoop = null})

        const _05x_span = document.createElement("span")
        container.appendChild(_05x_span)
        const _05x_button = document.createElement("button")
        _05x_span.appendChild(_05x_button)
        _05x_button.innerHTML = "0.5X"
        _05x_button.setAttribute("id", "_05x-button")
        _05x_button.setAttribute("class", "speed-button")
        _05x_button.addEventListener("click", _05x_function)


        const _1x_span = document.createElement("span")
        container.appendChild(_1x_span)
        const _1x_button = document.createElement("button")
        _1x_span.appendChild(_1x_button)
        _1x_button.innerHTML = "1X"
        _1x_button.setAttribute("id", "_1x-button")
        _1x_button.setAttribute("class", "speed-button")
        _1x_button.addEventListener("click", _1x_function)
       
        
        
        const _2x_span = document.createElement("span")
        container.appendChild(_2x_span)
        const _2x_button = document.createElement("button")
        _2x_span.appendChild(_2x_button)
        _2x_button.innerHTML = "2X"
        _2x_button.setAttribute("id", "_2x-button")
        _2x_button.setAttribute("class", "speed-button")
        _2x_button.addEventListener("click", _2x_function)
    },
    "continue" : {
        draw : (container_out) => {
            const modal_fade = document.createElement("div")
            modal_fade.setAttribute("class","modal fade")
            modal_fade.setAttribute("id", "ModalEnd")
            modal_fade.setAttribute("tabindex", "-1")
            modal_fade.setAttribute("role", "dialog")
            modal_fade.setAttribute ("aria-labelledby", "exampleModalLongTitle")
            modal_fade.setAttribute("aria-hidden", "true")
            const modal_dialog = document.createElement("div")
            modal_dialog.setAttribute("class", "modal-dialog modal-dialog-centered")
            modal_dialog.setAttribute("role", "document")
            const modal_content = document.createElement("div")
            modal_content.setAttribute("class", "modal-content")
            const modal_header = document.createElement("div")
            modal_header.setAttribute("class", "modal-header")
            const h5 = document.createElement("h5")
            h5.setAttribute("class", "modal-title")
            h5.setAttribute("id", "ModalEndTitle")
            h5.innerHTML = "Modal title"
            const button = document.createElement("button")
            button.setAttribute("type", "button")
            button.setAttribute("class","close")
            button.setAttribute("data-dismiss", "modal")
            button.setAttribute("aria-label", "Close")
            const modal_body = document.createElement("div")
            modal_body.setAttribute("class", "modal-body")
            modal_body.setAttribute("id", "modal-body-end")
            modal_body.innerHTML = ""
            const modal_footer = document.createElement("div")
            modal_footer.setAttribute("class", "modal-footer-initial-end")
            const button2 = document.createElement("button")
            button2.setAttribute("type","button")
            button2.setAttribute("class","btn btn-secondary")
            button2.setAttribute("data-dismiss","modal")
            button2.setAttribute("id", "restart")
            button2.innerHTML = "RESTART"
            const button3 = document.createElement("button")
            button3.setAttribute("type","button")
            button3.setAttribute("class","btn btn-secondary")
            button3.setAttribute("data-dismiss","modal")
            button3.setAttribute("id", "exit")
            button3.innerHTML = "EXIT"
            container_out.appendChild(modal_fade)
            modal_fade.appendChild(modal_dialog)
            modal_dialog.appendChild(modal_content)
            modal_content.appendChild(modal_header)
            modal_header.appendChild(h5)
            modal_header.appendChild(button)
            modal_content.appendChild(modal_body)
            modal_content.appendChild(modal_footer)
            modal_footer.appendChild(button2)
            //modal_footer.appendChild(button3)
        },
        update : (state) => {
            win = () => {
                document.getElementById("ModalEndTitle").innerHTML = "YOU WON"
                document.getElementById("modal-body-end").innerHTML = "you won"
                document.getElementById("restart").addEventListener("click", function(){window.location.reload()})
                document.getElementById("restart").innerHTML = "RESTART"
                //document.getElementById("exit").addEventListener("click", function(){})
                //document.getElementById("exit").innerHTML = "EXIT"
                $('#ModalEnd').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                //clearInterval(currentLoop)
                clearInterval(gameLoop)
                document.getElementById("_2x-button").removeEventListener("click", _2x_function)
                document.getElementById("_05x-button").removeEventListener("click", _05x_function)
                document.getElementById("_1x-button").removeEventListener("click", _1x_function)
            }

            if (state.infects >= state.popolation || state.feeling === 0 || state.pil < state.pil_0*0.3){
                if (state.pil < state.pil_0*0.3){
                    state.pil = state.pil_0*0.3
                    document.getElementById("modal-body-end").innerHTML = "your pil is less than 30% of the initial pil"

                }
                else if (state.infects >= state.popolation){
                    document.getElementById("modal-body-end").innerHTML = "the entire popolation has been infected"
                }
                else if (state.feeling === 0){
                    document.getElementById("modal-body-end").innerHTML = "feeling is 0% you had been dismissed"
                }
                document.getElementById("ModalEndTitle").innerHTML = "YOU LOST"
                document.getElementById("x").innerHTML = ""
                document.getElementById("restart").addEventListener("click", function(){window.location.reload()})
                document.getElementById("restart").innerHTML = "RESTART"
                //document.getElementById("exit").addEventListener("click", function(){close()})
                //document.getElementById("exit").innerHTML = "EXIT"
                $('#ModalEnd').modal({
                    backdrop: 'static',
                    keyboard: false
                })
                //clearInterval(currentLoop)
                clearInterval(gameLoop)
                document.getElementById("_2x-button").removeEventListener("click", _2x_function)
                document.getElementById("_05x-button").removeEventListener("click", _05x_function)
                document.getElementById("_1x-button").removeEventListener("click", _1x_function)
            }
            else if (state.difficulty === "easy"){
                if (state.world.curYear === state.world.initial_year && state.world.curDay === state.world.initial_day && state.world.month_numb === state.world.initial_month + 7){
                    win()
                }
            }
            else if (state.difficulty === "normal"){
                if (state.world.curYear === (state.world.initial_year + 1) && state.world.curDay === state.world.initial_day && state.world.month_numb === state.world.initial_month + 1){
                    win()
                }
            }
            else if (state.difficulty === "extreme"){
                if (state.world.curYear === (state.world.initial_year + 1)  && state.world.curDay === state.world.initial_day && state.world.month_numb === state.world.initial_month + 7){
                    win()
                }
            }
        }
    },
    "display_date" : {
        draw : (container_out, world)  => {
            const container = document.createElement("div")
            container.setAttribute("class", "date-menu")
            container_out.appendChild(container)
            const date_flex = document.createElement("div")
            date_flex.setAttribute("class", "date-flex")
            const date = document.createElement("div")
            date_flex.appendChild(date)
            date.setAttribute("id", "date")
            date.setAttribute("class", "date")
            const win_date = document.createElement("div")
            win_date.setAttribute("id", "win-date")
            win_date.setAttribute("class", "date")
            date_flex.appendChild(win_date)
            container.appendChild(date_flex)
            

            var date0 = new Date()
            date.innerHTML = "date : " + date0.getDate() + " " + months[date0.getMonth()] + " " + date0.getFullYear()
            win_date.innerHTML = "   win date : " + world.state.win_date
        },
        update : (world) => {
            var date0 = new Date()
            if (world.date !== null){
                document.getElementById("date").innerHTML = "date : " + world.curDay + " " + months[(world.month_numb) - 1] + " " + world.curYear
            }
            else {
                document.getElementById("date").innerHTML = "date : " + date0.getDate() + " " + months[date0.getMonth()] + " " + date0.getFullYear()
            }
            document.getElementById("win-date").innerHTML = "win date : " + world.state.win_date
        }
    },
    display_numbers : (number) => {
        number = number.toString()
        if (number.length > 9){
            number = number.substring(0, number.length - 9)
            if (number == 1){
                number = number + " Miliardo"
            }
            else {
                number = number + " Miliardi"
            }
        }

        else if (number.length > 7){
            number = number.substring(0, number.length - 6)
            number = number + " M"
        }
        else if (number.length > 3){
            number = number.substring(0, number.length - 3)
            number = number + " k"
        }

        return number
    },
    display_modal_center : (container_out) => {
        const modal_fade = document.createElement("div")
        modal_fade.setAttribute("class","modal fade")
        modal_fade.setAttribute("id", "exampleModalCenter")
        modal_fade.setAttribute("tabindex", "-1")
        modal_fade.setAttribute("role", "dialog")
        modal_fade.setAttribute ("aria-labelledby", "exampleModalCenterTitle")
        modal_fade.setAttribute("aria-hidden", "true")
        const modal_dialog = document.createElement("div")
        modal_dialog.setAttribute("class", "modal-dialog modal-dialog-centered")
        modal_dialog.setAttribute("role", "document")
        const modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modal-content")
        const modal_header = document.createElement("div")
        modal_header.setAttribute("class", "modal-header")
        const h5 = document.createElement("h5")
        h5.setAttribute("class", "modal-title")
        h5.setAttribute("id", "exampleModalLongTitle")
        h5.innerHTML = "Modal title"
        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("class","close")
        button.setAttribute("data-dismiss", "modal")
        button.setAttribute("aria-label", "Close")
        const span = document.createElement("span")
        span.setAttribute("aria-hidden", "true")
        span.setAttribute("id", "x")
        span.innerHTML = "&times;"
        const modal_body = document.createElement("div")
        modal_body.setAttribute("class", "modal-body")
        modal_body.setAttribute("id", "modal-body")
        modal_body.innerHTML = ""
        const modal_footer = document.createElement("div")
        modal_footer.setAttribute("class", "modal-footer")
        const button2 = document.createElement("button")
        button2.setAttribute("type","button")
        button2.setAttribute("class","btn btn-secondary")
        button2.setAttribute("data-dismiss","modal")
        button2.setAttribute("id", "modal_end_close")
        button2.innerHTML = "Close"
        container_out.appendChild(modal_fade)
        modal_fade.appendChild(modal_dialog)
        modal_dialog.appendChild(modal_content)
        modal_content.appendChild(modal_header)
        modal_header.appendChild(h5)
        modal_header.appendChild(button)
        button.appendChild(span)
        modal_content.appendChild(modal_body)
        modal_content.appendChild(modal_footer)
        modal_footer.appendChild(button2)
    },
    "display_riot" : {
        update : (state) => {
            var people = "people"
            if (Math.round(state.infects*(40/100)) === 1){
                people = "person"
            }
            if (state.riot_type ==="infects"){
                document.getElementById("exampleModalLongTitle").innerHTML = "URBAN RIOT"
                document.getElementById("modal-body").innerHTML = "<br class = 'modal-riot-br'>There has been a gathering of people and a new outbreak has formed. <br class = 'modal-riot-br'>  <br class = 'modal-riot-br'>" +  Math.round(state.infects*(30/100)) +  " " + people + " have been infected"
                $('#exampleModalCenter').modal('show')
                state.riot_type = ""
            }
            else if (state.riot_type ==="both"){
                document.getElementById("exampleModalLongTitle").innerHTML = "URBAN RIOT"
                document.getElementById("modal-body").innerHTML = "<br class = 'modal-riot-br'> there has been an assault on supermarkets <br class = 'modal-riot-br'> <br class = 'modal-riot-br'>" + Math.round(state.infects*(15/100)) + " " + people + " have been infected" + "<br class = 'modal-riot-br'><br class = 'modal-riot-br'>" + "Pil has decreased of " + state.economy_riot_influence.toFixed(1) + "%"
                $('#exampleModalCenter').modal('show')
                state.riot_type = ""

            }
            else if (state.riot_type ==="economy"){
                document.getElementById("exampleModalLongTitle").innerHTML = "ECONOMIC ACCIDENT"
                document.getElementById("modal-body").innerHTML = "<br class = 'modal-riot-br'>there has been a speculative bubble on the masks <br class = 'modal-riot-br'> <br class = 'modal-riot-br'>" + "Pil has decreased of " + state.economy_riot_influence.toFixed(1) + "%"
                $('#exampleModalCenter').modal('show')
                state.riot_type = ""

            }
        }
    },
    
    "display_block_trades": {
        draw: (container_out,state)=>{
            const toggle_button=document.createElement("button")
            $(toggle_button).attr({
                "type": "button",
                "class":"btn btn-primary",
                "id":"trades-btn",
                "data-toggle":"modal",
                "data-target":".bd-example-modal-lg"
            })
        
            toggle_button.innerHTML="BLOCK TRADES"
        
            const modal_outer=document.createElement("div")
            $(modal_outer).attr({
                "class":"modal fade bd-example-modal-lg",
                "tabindex":"-1",
                "role":"dialog",
                "aria-labelledby":"myLargeModalLabel",
                "aria-hidden":"true"
        
            })
            const modal_inner=document.createElement("div")
            modal_inner.setAttribute("class","modal-dialog modal-lg")
            const modal_content=document.createElement("div")
            modal_content.setAttribute("class","modal-content")
            modal_inner.appendChild(modal_content)
            modal_outer.appendChild(modal_inner)
        
            //HEADER 
            const header=document.createElement("div")
            header.setAttribute("class","modal-header")
            const title=document.createElement("h5")
            $(title).attr({
                "class":"modal-title",
                "id":"exampleModalLongTitle"
            })
            title.innerHTML="BLOCK TRADES"
            header.appendChild(title)
            const close_button=document.createElement("button")
            $(close_button).attr({
                "type":"button",
                "class":"close" ,
                "data-dismiss":"modal" ,
                "aria-label":"Close"
            })
            const s=document.createElement("span")
            s.setAttribute("aria-hidden","true")
            s.innerHTML="&times;"
            close_button.appendChild(s)
            header.appendChild(close_button)
            modal_content.appendChild(header)
        
            //----------
        
            const body=document.createElement("div")
            body.setAttribute("class","modal-body")
            modal_content.appendChild(body)
        
            const trades_wrap=document.createElement("div")
            trades_wrap.setAttribute("class","trades_wrap")
            const trades=document.createElement("ul")
            for(let i=0;i<6;i++){
                const curTrade=document.createElement("li")
                if(i===0){    
                    curTrade.setAttribute("class","on")
                }
                else{
                    curTrade.setAttribute("class","trade-item")
                }
                
                curTrade.setAttribute("id","trade"+(i+1))
                switch(i){
                    case 0:
                        curTrade.innerHTML="No blocks"
                        
                        break
                    case 1:
                        curTrade.innerHTML="Limit every trade"
                        
                        break
                    case 2:
                        curTrade.innerHTML="Block trades from  adjoinig countries"
                        
                        break
                    case 3:
                        curTrade.innerHTML="Block trades from  and to adjoining countries"
                        
                        break
                    case 4:
                        curTrade.innerHTML="Block every economic import"
                        
                        break
                    case 5:
                        curTrade.innerHTML="Shut down international commerce imports and exports"
                        
                        break
                    
                }
                trades.appendChild(curTrade)
            }
        
            trades_wrap.appendChild(trades)
            body.appendChild(trades_wrap)
            container_out.appendChild(toggle_button)
            container_out.appendChild(modal_outer)
            
            $("#trade1").click(()=>{state.block_trades(1)
                console.log(1)
            
                document.getElementById("trade1").setAttribute("class","on")
                document.getElementById("trade2").setAttribute("class","trade-item")
                document.getElementById("trade3").setAttribute("class","trade-item")
                document.getElementById("trade4").setAttribute("class","trade-item")
                document.getElementById("trade5").setAttribute("class","trade-item")
                document.getElementById("trade6").setAttribute("class","trade-item")
        
            })
            $("#trade2").click(()=>{state.block_trades(2)
            
                document.getElementById("trade2").setAttribute("class","on")
                document.getElementById("trade1").setAttribute("class","trade-item")
                document.getElementById("trade3").setAttribute("class","trade-item")
                document.getElementById("trade4").setAttribute("class","trade-item")
                document.getElementById("trade5").setAttribute("class","trade-item")
                document.getElementById("trade6").setAttribute("class","trade-item")
        
            })
            $("#trade3").click(()=>{state.block_trades(3)
            
                document.getElementById("trade3").setAttribute("class","on")
                document.getElementById("trade2").setAttribute("class","trade-item")
                document.getElementById("trade1").setAttribute("class","trade-item")
                document.getElementById("trade4").setAttribute("class","trade-item")
                document.getElementById("trade5").setAttribute("class","trade-item")
                document.getElementById("trade6").setAttribute("class","trade-item")
        
            })
            $("#trade4").click(()=>{state.block_trades(4)
            
                document.getElementById("trade4").setAttribute("class","on")
                document.getElementById("trade2").setAttribute("class","trade-item")
                document.getElementById("trade3").setAttribute("class","trade-item")
                document.getElementById("trade1").setAttribute("class","trade-item")
                document.getElementById("trade5").setAttribute("class","trade-item")
                document.getElementById("trade6").setAttribute("class","trade-item")
        
            })
            $("#trade5").click(()=>{state.block_trades(5)
            
                document.getElementById("trade5").setAttribute("class","on")
                document.getElementById("trade2").setAttribute("class","trade-item")
                document.getElementById("trade3").setAttribute("class","trade-item")
                document.getElementById("trade4").setAttribute("class","trade-item")
                document.getElementById("trade1").setAttribute("class","trade-item")
                document.getElementById("trade6").setAttribute("class","trade-item")
        
            })
            $("#trade6").click(()=>{state.block_trades(6)
            
                document.getElementById("trade6").setAttribute("class","on")
                document.getElementById("trade2").setAttribute("class","trade-item")
                document.getElementById("trade3").setAttribute("class","trade-item")
                document.getElementById("trade4").setAttribute("class","trade-item")
                document.getElementById("trade5").setAttribute("class","trade-item")
                document.getElementById("trade1").setAttribute("class","trade-item")
        
            })
        }

    },
    "display_title":{
        draw:(container_out)=>{
            const wrap=document.createElement("div")
            wrap.setAttribute("class","text-bg")
            wrap.innerHTML="RISE UP"
            container_out.appendChild(wrap)
        }

    },
    initial_modal : (container_out, state) => {
        console.log(container_out)
        const modal_fade = document.createElement("div")
        modal_fade.setAttribute("class","modal fade")
        modal_fade.setAttribute("id", "InitialModal")
        modal_fade.setAttribute("tabindex", "-1")
        modal_fade.setAttribute("role", "dialog")
        modal_fade.setAttribute ("aria-labelledby", "exampleModalCenterTitle")
        modal_fade.setAttribute("aria-hidden", "true")
        const modal_dialog = document.createElement("div")
        modal_dialog.setAttribute("class", "modal-dialog modal-dialog-centered")
        modal_dialog.setAttribute("role", "document")
        const modal_content = document.createElement("div")
        modal_content.setAttribute("class", "modal-content")
        const modal_header = document.createElement("div")
        modal_header.setAttribute("class", "modal-header")
        const h5 = document.createElement("h5")
        h5.setAttribute("class", "modal-title")
        h5.setAttribute("id", "exampleModalLongTitle")
        h5.innerHTML = "CHOOSE DIFFICULTY"
        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("class","close")
        button.setAttribute("data-dismiss", "modal")
        button.setAttribute("aria-label", "Close")
        const modal_body = document.createElement("div")
        modal_body.setAttribute("class", "modal-body")
        modal_body.setAttribute("id", "modal-body")
        modal_body.innerHTML = ""
        const modal_footer = document.createElement("div")
        modal_footer.setAttribute("class", "modal-footer-initial-end")
        modal_footer.setAttribute("id", "modal-footer-initial-end")
        const button2 = document.createElement("button")
        button2.setAttribute("type","button")
        button2.setAttribute("class","btn btn-secondary")
        button2.setAttribute("data-dismiss","modal")
        button2.setAttribute("id", "modal_end_close")
        button2.innerHTML = "Easy"
        const button3 = document.createElement("button")
        button3.setAttribute("type","button")
        button3.setAttribute("class","btn btn-secondary")
        button3.setAttribute("data-dismiss","modal")
        button3.setAttribute("id", "modal_end_close")
        button3.innerHTML = "Medium"
        const button4 = document.createElement("button")
        button4.setAttribute("type","button")
        button4.setAttribute("class","btn btn-secondary")
        button4.setAttribute("data-dismiss","modal")
        button4.setAttribute("id", "modal_end_close")
        button4.innerHTML = "Hard"
        container_out.appendChild(modal_fade)
        modal_fade.appendChild(modal_dialog)
        modal_dialog.appendChild(modal_content)
        modal_content.appendChild(modal_header)
        modal_header.appendChild(h5)
        modal_header.appendChild(button)
        modal_content.appendChild(modal_body)
        modal_content.appendChild(modal_footer)
        modal_footer.appendChild(button2)
        modal_footer.appendChild(button3)
        modal_footer.appendChild(button4)
        button2.addEventListener("click", function(){state.difficulty = "easy"})
        button3.addEventListener("click", function(){state.difficulty = "medium"})
        button4.addEventListener("click", function(){state.difficulty = "extreme"})
        $('#InitialModal').modal({
            backdrop: 'static',
            keyboard: false
        })
    },
    "tutorial" : {
        start_1 : () => {
            alert("Tutorial")
            close_button.addEventListener("click", drawing_tools.tutorial.stop())
        },
        stop_1 : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.counters())
        },
        counters : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.decisions())
        },
        decisions : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.red_zone())
        },
        red_zone : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.booleans())
        },
        booleans : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.block_trades())
        },
        block_trades : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.transfer_beds())
        },
        transfer_beds : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.medical_stats())
        },
        medical_stats : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.build_hospitals())
        },
        build_hospitals : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.start_2())
        },
        start_2 : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.stop_2())
        },
        stop_2 : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.loans())
        },
        loans : () => {
            close_button.addEventListener("click", drawing_tools.tutorial.decisions())
        },
        start_3 : () => {
            
        }
    }
}









// -------funzioni per spec ----------




//drawing_tools["display_decisions"].draw(dec,document.body) la chiami così poi devo mettere il make decisions quindi bisognerà passargli anche lo stato nel main

//chiami il draw solo una volta poi update
    