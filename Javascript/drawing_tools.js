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
                document.getElementById("rangeValue").innerHTML=this.value
                document.getElementById("fillRangeValue").style.width=+this.value+"%"
            })
            input.addEventListener("change", function rangeSlider(){
                reference[0]=parseInt(this.value)
                document.getElementById("rangeValue").innerHTML=this.value
                document.getElementById("fillRangeValue").style.width=+this.value+"%"
            })
        
            
            
        }
    },

    "display_specializations" : {
        draw : (dictionary,container_out, state) =>{
            const container=document.createElement("div")
            container.setAttribute("class","spec-menu")

            const flex_container = document.createElement("div")
            container.appendChild(flex_container)
            flex_container.setAttribute("class", "flex-container")
            const reanimate_beds = document.createElement("div")
            flex_container.appendChild(reanimate_beds)
            reanimate_beds.setAttribute("class", "reanimate-beds")
            reanimate_beds.setAttribute("id", "reanimate-beds")
            reanimate_beds.innerHTML = "reanimate beds: \n" + dictionary["reanimate_beds"]
            const button = document.createElement("div") 
            flex_container.appendChild(button)
            button.setAttribute("class", "require-beds")
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
            /*
            const showcontainer = document.createElement("div")
            showcontainer.setAttribute("class", "spec-show-container")
            container.appendChild(showcontainer)
            const showup = document.createElement("div")
            showcontainer.appendChild(showup)
            showup.setAttribute("class", "spec-showup")
            showup.addEventListener("click", pop2)
            showup.innerHTML = "show specialization"
            const spec_show_menu_items = document.createElement("div")
            showcontainer.appendChild(spec_show_menu_items)
            spec_show_menu_items.setAttribute("class", "spec-show-menu-items")
            var i = 0
            Object.keys(dictionary).forEach((key)=>{
                if (key !== "level" && key !== "reanimate_beds" && key !== "beds_possible" && key !== "min"){
                    const spec_show_menu_item = document.createElement("div")
                    spec_show_menu_item.setAttribute("class", "spec-item"+(i+1))
                    spec_show_menu_item.setAttribute("id", key+" toUpdate")
                    spec_show_menu_items.appendChild(spec_show_menu_item)
                    spec_show_menu_item.innerHTML = key +": "+ dictionary[key] 
                    i++
                }
            })
            */
            container_out.appendChild(container)
            
            var i = 0
            function pop(){
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

            var j = 0
            function pop2 () {
                if (j === 0){
                    document.getElementById("cardiology_beds toUpdate").style.transform = "translate(-100px, 40px)"
                    document.getElementById("neurology_beds toUpdate").style.transform = "translate(100px, 40px)"
                    document.getElementById("gynecology_beds toUpdate").style.transform = "translate(-100px, 80px)"
                    document.getElementById("urology_beds toUpdate").style.transform = "translate(100px, 80px)"
                    document.getElementById("pulmonology_beds toUpdate").style.transform = "translate(-100px, 120px)"
                    document.getElementById("pediatrics_beds toUpdate").style.transform = "translate(100px, 120px)"
                    document.getElementById("psychiatry_beds toUpdate").style.transform = "translateY(150px)"
                    j = 1
                }
                else{
                    if (j === 1){
                        document.getElementById("cardiology_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("neurology_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("gynecology_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("urology_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("pulmonology_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("pediatrics_beds toUpdate").style.transform = "translate(0)"
                        document.getElementById("psychiatry_beds toUpdate").style.transform = "translateY(0)"
                    j = 0
                    }
                }
            }
        },
        update : (dictionary) => {
            Object.keys(dictionary).forEach(key =>{
                if (key !== "level" && key !== "min"){
                    if (key !== "reanimate_beds"){
                        /*document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+ dictionary[key]*/
                    }
                    else if (key === "reanimate_beds"){
                        document.getElementById("reanimate-beds").innerHTML = key.replace(/_/g," ")+ ": " + dictionary[key]
                    }
                }
            })
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
            h.innerHTML="Make Loans"
            make_loan_div.appendChild(h)
            const buttons_wrap=document.createElement("div")
            buttons_wrap.setAttribute("class","buttons_wrap")
            make_loan_div.appendChild(buttons_wrap)
            const low_risk = document.createElement("button")
            low_risk.innerHTML = "low risk"
            low_risk.addEventListener("click" ,function(){state.make_loan(state.create_date("low"), 1000000000, 3, 20, "low");drawing_tools.display_loans.update_internal(state)})
            buttons_wrap.appendChild(low_risk)
            const high_risk = document.createElement("button")
            high_risk.innerHTML = "high risk"
            high_risk.addEventListener("click" ,function(){state.make_loan(state.create_date("high"), 2000000000, 6, 40, "high");drawing_tools.display_loans.update_internal(state)})
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
            const add_hospitals = document.createElement("button")
            container.appendChild(add_hospitals)
            add_hospitals.setAttribute("class", "hopsital_button")
            add_hospitals.innerHTML = "add hospitals"
            add_hospitals.addEventListener("click", function(){if (state.health_funds - 1000000000 > 0) {state.make_new_hospital()} else{/*alert*/}})
            const new_hospitals = document.createElement("span")
            container.appendChild(new_hospitals)
            new_hospitals.setAttribute("class", "show-new-hospitals")
            new_hospitals.setAttribute("id", "show-new-hospitals")
            new_hospitals.innerHTML = "new hospitals: " + state.decision["new_hospitals"]
        },
        update : (state) => {
            const new_hospitals = document.getElementById("show-new-hospitals")
            new_hospitals.innerHTML = "new hospitals: " + state.decision["new_hospitals"]

                        

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

        container_out.appendChild(container)
        container_out.appendChild(container_deaths)
    
        
    
        },
        update :(infects,economy,feeling,deaths) =>{
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
    }

}



// -------funzioni per spec ----------




//drawing_tools["display_decisions"].draw(dec,document.body) la chiami così poi devo mettere il make decisions quindi bisognerà passargli anche lo stato nel main

//chiami il draw solo una volta poi update
    