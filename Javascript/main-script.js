//lui ha coscienza sia di tutti i tools sia del clock
//poi qui basta creare la griglia con bootstrap che puoi usare perchè ho messo la cdn e chiamare i tools
//bisogna dargli coscienza poi del main e passare lo stato per gli effetti

//drawing_tools.display_decisions.draw(dizionario da dare,div esterno dove aggiunge la lista fatta bene)
updates = () =>{
    drawing_tools.display_decisions.update(stato.decision_dictonary)
    drawing_tools.display_decisions.update_dicto(stato)
    drawing_tools.display_specializations.update(stato.specializations)
    drawing_tools.display_loans.update(stato)
    drawing_tools.display_hospitals.update(stato)
    drawing_tools.display_counters.update((stato.infects/stato.popolation)*100,((stato.pil/stato.pil_0).toFixed(20)*100),stato.feeling,stato.dead)
    
}
const fps=30
var daytime=0.5


//Create canvas

createGrid(3)


//-------------------------
//Top

//0

//1

//2



//------------------------
//Mid

//0
drawing_tools.display_decisions.draw(stato.decision_dictonary,document.getElementById("col 0 1"),stato)
drawing_tools.display_boolean.draw("close_stock",stato.decision,document.getElementById("col 0 1"))
drawing_tools.display_boolean.draw("mandatory_masks",stato.decision,document.getElementById("col 0 1"))
//1
drawing_tools.display_counters.draw(stato.perc_infects,stato.perc_economy,stato.feeling,stato.dead,document.getElementById("col 1 1"))


//2
drawing_tools.display_specializations.draw(stato.specializations, document.getElementById("col 2 1"), stato)
drawing_tools.display_loans.draw(document.getElementById("col 2 1"),stato)
drawing_tools.display_hospitals.draw(document.getElementById("col 2 1"),stato)

//------------------------
//Bottom

//0
drawing_tools.display_red_zone.draw(stato.decision["red_zone"],document.getElementById("col 0 2"))

//1


//2



//Loops 
//var timerClock = setInterval(function(){clock(stato);stato.summaries();/*stato.print()*/}, 1000/daytime)

var timerClock = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime)

var gameLoop = setInterval(function(){ updates()},1000/fps)


/*
var timerUpdate =setInterval(() => {
    Object.keys(drawing_tools).forEach((key)=>{
        key.update(dizionario da dare)
    })
    
},1000/fps); 
*/
//qui è un po' una bazza perchè gli update funzioneranno non tutti uguali quindi vanno fatti più for