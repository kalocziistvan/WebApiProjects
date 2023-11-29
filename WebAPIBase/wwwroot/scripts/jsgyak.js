window.onload = function () {
    for (var sor = 0; sor < 10; sor++) {
        //új div létrehozása az új sornak
        var ujdiv = document.createElement('div');
        //új div osztálylistájához add hozzá a "sor"-t
        ujdiv.classList.add('sor');
        //új div-et add hozzá a "pascal" gyermekeihez
        var pascaldiv = document.getElementById('pascal');
        pascaldiv.appendChild(ujdiv);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            //új div létrehozása az új elemnek
            var newdiv = document.createElement('div');
            //új elem div osztálylistájához add hozzá az "elem"-et
            newdiv.classList.add('elem');
            //teszteléshet .innerHTML = `${sor}:${oszlop}`
            newdiv.innerText = faktoriális(sor) / (faktoriális(oszlop) * faktoriális(sor - oszlop));
            //legyen az innerHTML a megfelelő szám
            //új elem div-et vedd fel a sor elemei közé
            ujdiv.appendChild(newdiv);
        }
    }
};
var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}