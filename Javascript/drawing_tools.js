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
                if (key === "remote_working_companies"){
                    displayer.innerHTML=key.replace(/_/g," ")+ ": "+(100-dictionary[key][0])+"%"
                }
                else {
                    displayer.innerHTML=key.replace(/_/g," ")+ ": "+dictionary[key][0]+"%"
                }
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
        update:(dictionary) =>{
            Object.keys(dictionary).forEach(key =>{
              document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+dictionary[key][0]+"%"
            if (key === "remote_working_companies"){
                document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+(100-dictionary[key][0])+"%"
            }
            else {
                document.getElementById(key+" toUpdate").innerHTML=key.replace(/_/g," ")+ ": "+dictionary[key][0]+"%"
            } 
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
    }
    
}


//drawing_tools["display_decisions"].draw(dec,document.body) la chiami così poi devo mettere il make decisions quindi bisognerà passargli anche lo stato nel main

//chiami il draw solo una volta poi update
    