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
            <img src="img/add.png" alt="Add" onclick="getMenu(${i})">
        </div>
    </div>    `
}

function getMenu(i){
    let menuName = getNameMenu(i);
    let menuPrice = getPriceMenu(i);
    zumWarenkorb(menuName, menuPrice);
}


function deleteMenu(i){
    
}

function getNameMenu(i){
    return menus[i]["name"];
}


function getPriceMenu(i){
    return menus[i]["preis"];
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
    render();
}


function getMenuIndex(menu) {
    return menuWarenkorb.indexOf(menu);
}


function renderWarenkorb() {
    let warenkorb = document.getElementById('warenkorbWaren');
    if (menuWarenkorb == null) {
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
        const menuprice = preisWarenkorb[m];
        const menuamount = mengeWarenkorb[m];

        warenkorb.innerHTML += /*html*/`
        <div class="vollerKorb">
            <p>${menuamount}x      ${menuname}     ${menuprice}€</p>
        </div>
    `
    }
}

function saveArray() {
    localStorage.setItem('meal', JSON.stringify(menuWarenkorb));
    localStorage.setItem('price', JSON.stringify(preisWarenkorb));
    localStorage.setItem('amount', JSON.stringify(mengeWarenkorb));
}


function loadArray(){
    let loadMenu = localStorage.getItem('meal');       
    let loadPrice = localStorage.getItem('price'); 
    let loadAmount = localStorage.getItem('amount'); 
    if (loadMenu != null){                                  
        menuWarenkorb = JSON.parse(loadMenu);
        preisWarenkorb = JSON.parse(loadPrice);
        mengeWarenkorb = JSON.parse(loadAmount);
        }
    }
    