//lui ha coscienza sia di tutti i tools sia del clock
//poi qui basta creare la griglia con bootstrap che puoi usare perchè ho messo la cdn e chiamare i tools
//bisogna dargli coscienza poi del main e passare lo stato per gli effetti

//drawing_tools.display_decisions.draw(dizionario da dare,div esterno dove aggiunge la lista fatta bene)
const fps=30
const daytime=.5
drawing_tools.display_decisions.draw(stato.decision,document.body,stato)
drawing_tools.display_boolean.draw("close_stock",stato.decision,document.body)
drawing_tools.display_boolean.draw("mandatory_masks",stato.decision,document.body)
var timerClock = setInterval(function(){clock(stato);stato.summaries();stato.print()}, 1000/daytime)
var gameLoop = setInterval(function(){ drawing_tools.display_decisions.update(stato.decision)},1000/fps)

/*
var timerUpdate =setInterval(() => {
    Object.keys(drawing_tools).forEach((key)=>{
        key.update(dizionario da dare)
    })
    
},1000/fps); 
*/
//qui è un po' una bazza perchè gli update funzioneranno non tutti uguali quindi vanno fatti più for