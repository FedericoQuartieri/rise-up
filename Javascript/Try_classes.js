const states = {
    "italia" : 
                {
                    "posti_letto" : 150000,
                    "posti_letto_rianimazione" : 5000,
                    "PIL" : 1935000000000,
                    "percentuale_pil_sanita": 6.5
                }
}


var World = function(countries_n,popolation){
    this.countries_n=countries_n;
    this.popolation=popolation;
    this.infects=1;
    this.infection_rate=0;
    this.countries=[];//poi in base a countries_n popoli il mondo con tot paesi
    console.log("created new world !")
    this.assign= function(){
        
    }//questa è la funzione che fa scegliere il paese o comunque che dice qual è quello selezionato
    this.increase=function (n){
        this.infection_rate+=n;
    } 
    this.infect=function(){
        this.infects+=this.infects*(this.infection_rate/100)
        this.infects=Math.round(this.infects)  //bisogna come arrotondare, così è al meglio però boh
    }
    this.print=function(){
        console.log("infected : " ,this.infects)
        console.log("rate : " ,this.infection_rate)
        
    }
}
w1= new World
w1.print()
w1.increase(50)
w1.infect()
w1.print()