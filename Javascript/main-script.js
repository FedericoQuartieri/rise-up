//lui ha coscienza sia di tutti i tools sia del clock
//poi qui basta creare la griglia con bootstrap che puoi usare perchè ho messo la cdn e chiamare i tools
//bisogna dargli coscienza poi del main e passare lo stato per gli effetti

//drawing_tools.display_decisions.draw(dizionario da dare,div esterno dove aggiunge la lista fatta bene)
const fps=1

var timerClock = setInterval(()=>clock(),1000/fps)
/*
var timerUpdate =setInterval(() => {
    Object.keys(drawing_tools).forEach((key)=>{
        key.update(dizionario da dare)
    })
    
},1000/fps); 
*/
//qui è un po' una bazza perchè gli update funzioneranno non tutti uguali quindi vanno fatti più for