var viccek
window.onload = letöltés()
function letöltés() {
    fetch('/jokes.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    viccek = d;
    for (var i = 0; i < d.length; i++) {
        console.log(d[i].question)
        let elem = document.createElement("div")
        elem.innerHTML = d[i].question
        ide.appendChild(elem)
    }
}