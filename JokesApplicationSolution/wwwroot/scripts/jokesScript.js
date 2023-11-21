// window.onload eseményre feliratkozunk: 
// Ez akkor fut le, ha teljesen betöltött az oldal.
window.onload = function () {

    // feliratkozunk a két gomb click eseményére

    var btnShowAll = document.getElementById('btnShowAll');
    btnShowAll.addEventListener('click', showAll);

    var btnClear = document.getElementById('btnClear');
    btnClear.addEventListener('click', clearJokesSzebb);
};

// While ciklus segítségével töröljük az összes div "gyermeket"
var clearJokes = function () {
    var jokesDiv = document.getElementById('jokesDiv');

    while (jokesDiv.hasChildNodes()) {
        jokesDiv.removeChild(jokesDiv.lastChild);
    }
};

// Szebben a fenti
var clearJokesSzebb = function () {
    var jokesDiv = document.getElementById('jokesDiv');
    var ujUresDiv = document.createElement('div');

    jokesDiv.parentNode.replaceChild(ujUresDiv, jokesDiv); //kicseréljük őket :)
}

var showAll = function () {
    var jokesDiv = document.getElementById('jokesDiv');

    // REST API meghívása api/jokes id és minden nélkül
    fetch('api/jokes').then(r => r.json()).then(data => {
        for (var i = 0; i < data.length; i++) {

            var ujViccDiv = document.createElement('div');
            ujViccDiv.id = data[i]['jokeSk']
            ujViccDiv.innerText = data[i]['jokeText']

            ujViccDiv.addEventListener('click', e => {
                censoreDiv(e.target.id);
            });

            jokesDiv.appendChild(ujViccDiv);
        }
    })
};

var censoreDiv = function (id) {
    fetch(`api/jokes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'jokeText': 'Censored. :)' })
    }).then(r => r.json()).then(d => {
        var modifyingDiv = document.getElementById(`${d['jokeSk']}`);
        modifyingDiv.innerText = d['jokeText'];
    });
};