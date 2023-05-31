function render() {
    loadArray();
    renderMeals();
    renderWarenkorb();
}

function renderMeals() {
    let mealArea = document.getElementById('gericht');

    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        templateMenu(mealArea, menu, i)

    }
}

function templateMenu(mealArea, menu, i) {
    mealArea.innerHTML += /*html*/`  
    <div id="gerichtLeft${i}" class="menuCards">
        <div class="gerichtLeft">
            <h3 id="menuname${i}">${menu['name']}</h3>
            <p id ="price${i}">${menu['zutaten']}</p>
            <p>${menu['zusatzstoffe']}</p>
            <h3>${menu['preis']}€</h3>
        </div>
        <div class="gerichtRight">
            <img src="img/add.png" alt="Add" onclick="addMenu(${i})">
        </div>
    </div>    `
}

function addMenu(i) {
    let menuName = getNameMenu(i);
    let menuPrice = getPriceMenu(i);
    zumWarenkorb(menuName, menuPrice);
}


function deleteMenu(i) {

}

function getNameMenu(i) {
    return menus[i]["name"];
}


function getPriceMenu(i) {
    return Number(menus[i]["preis"]);
}


function zumWarenkorb(menuName, menuPrice) {
    if (getMenuIndex(menuName) == -1) {
        menuWarenkorb.push(menuName);
        preisWarenkorb.push(menuPrice);
        mengeWarenkorb.push(1);
    } else {
        mengeWarenkorb[getMenuIndex(menuName)]++;
    }
    saveArray();
    renderWarenkorb();
}


// function addAllreadyThere(menuName, menuPrice) {    
//     let totalPrice = menuPrice * mengeWarenkorb[getMenuIndex(menuName)];
//     preisWarenkorb[getMenuIndex(menuName)] = totalPrice.toFixed(2);
// }


function getMenuIndex(menu) {
    return menuWarenkorb.indexOf(menu);
}


function renderWarenkorb() {
    let warenkorb = document.getElementById('warenkorbWaren');
    if (menuWarenkorb == '') {
        keineWaren(warenkorb);
    } else {
        waren(warenkorb);
    }
}


function keineWaren(warenkorb) {
    warenkorb.innerHTML = /*html*/`
        <div id="leererKorb">
            <img src="img/einkaufswagen.png" alt="">
            <div>
                <h2>Füge deine Lieblingsspeisen zum Warenkorb dazu</h2>
            </div>
        </div>
    `
}


function waren(warenkorb) {
    warenkorb.innerHTML = "";

    for (let m = 0; m < menuWarenkorb.length; m++) {
        const menuname = menuWarenkorb[m];
        const menuprice = Number(preisWarenkorb[m] * mengeWarenkorb[m]).toFixed(2);
        const menuamount = mengeWarenkorb[m];

        warenkorb.innerHTML += /*html*/`
        <div class="vollerKorb">
            <p class="mengeWarenkorb">${menuamount}x</p>          
            <p class="menuWarenkorb">${menuname}</p>
            <div class="plusMinus">
                <button class="mini-btn" onclick="deleteOne(${m})" title="hinzufügen"><img src="/img/minus_18px.png"  alt="weniger"></button>
                <button class="mini-btn" onclick="addOne(${m})" title="entfernen"><img src="/img/plus_18px.png"  alt="mehr"></button>
                <img class="imgRemark" src="img/edit.svg" alt="Anemerkung" title="Anmerkungen">
            </div>
            <div class="priceAndDelete">
                <p class="preisWarenkorb">${menuprice}€</p>
                <img src="img/delete.svg" onclick="deleteAll(${m})" alt="deleteAll" title="löschen">
            </div>
        </div>
    `
    }
}


function addOne(m) {
    mengeWarenkorb[m]++;
    saveArray();
    renderWarenkorb();
}


function deleteOne(m) {
    if (mengeWarenkorb[m] > 1) {
        mengeWarenkorb[m]--;
    } else {
        menuWarenkorb.splice(m, 1);
        preisWarenkorb.splice(m, 1);
        mengeWarenkorb.splice(m, 1);
    }
    saveArray();
    renderWarenkorb();
}


function deleteAll(m) {
    menuWarenkorb.splice(m, 1);
    preisWarenkorb.splice(m, 1);
    mengeWarenkorb.splice(m, 1);
    saveArray();
    renderWarenkorb();
}


function saveArray() {
    localStorage.setItem('meal', JSON.stringify(menuWarenkorb));
    localStorage.setItem('price', JSON.stringify(preisWarenkorb));
    localStorage.setItem('amount', JSON.stringify(mengeWarenkorb));
}


function loadArray() {
    let loadMenu = localStorage.getItem('meal');
    let loadPrice = localStorage.getItem('price');
    let loadAmount = localStorage.getItem('amount');
    if (loadMenu != null) {
        menuWarenkorb = JSON.parse(loadMenu);
        preisWarenkorb = JSON.parse(loadPrice);
        mengeWarenkorb = JSON.parse(loadAmount);
    }
}
