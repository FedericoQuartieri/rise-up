const button = document.getElementById("incrementa-btn")
const counter = document.getElementById("contatore-lbl")

let counterValue = 0
const increment = () => {
  counterValue ++
  counter.innerHTML = counterValue
}

button.onclick = increment