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
        notationWarenkorb.push('');
    } else {
        mengeWarenkorb[getMenuIndex(menuName)]++;
    }
    saveArray();
    renderWarenkorb();
}


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
    `;
    
}


function waren(warenkorb) {
    warenkorb.innerHTML = "";

    for (let m = 0; m < menuWarenkorb.length; m++) {
        const menuname = menuWarenkorb[m];
        const menuprice = Number(preisWarenkorb[m] * mengeWarenkorb[m]).toFixed(2);
        const menuamount = mengeWarenkorb[m];
        const menunotation = notationWarenkorb[m];

        warenkorb.innerHTML += /*html*/`
        <div class="basket">
            <div class="vollerKorb">
                <div class="mengeSpeise">
                    <p class="mengeWarenkorb">${menuamount}x</p>          
                    <p class="menuWarenkorb">${menuname}</p>
                </div>    
                <div class="addAndPrice">
                    <div class="plusMinus">
                        <button class="mini-btn" onclick="deleteOne(${m})" title="hinzufügen"><img src="/img/minus_18px.png"  alt="weniger"></button>
                        <button class="mini-btn" onclick="addOne(${m})" title="entfernen"><img src="/img/plus_18px.png"  alt="mehr"></button>
                        <img id="imgNotation${m}" class="imgNotation" onclick="notation(${m})" src="img/edit.svg" alt="Anemerkung" title="Anmerkungen">
                    </div>
                    <div class="priceAndDelete">
                        <p class="preisWarenkorb">${menuprice}€</p>
                        <img src="img/delete.svg" onclick="deleteAll(${m})" alt="deleteAll" title="löschen">
                    </div>
                </div>            
                
            </div>
            <div id="annotation${m}" class="annotation"></div>
        </div>
    `
        askForNotation(m);
    }
    calcSubtotal();
}


function calcSubtotal(){
    
    let subtotal = [];
    let renderSubtotal = document.getElementById('zwischensumme');
    let subtotalSum = 0;

    for (let n = 0; n < menuWarenkorb.length; n++) {
        subtotal[n] = preisWarenkorb[n] * mengeWarenkorb[n];
    }    

    for (let o = 0; o < subtotal.length; o++) {
        subtotalSum += subtotal[o];      
    }
        subtotalSum = Number(subtotalSum).toFixed(2);

    renderSubtotal.innerHTML = /*html*/`
        <b>Zwischensumme</b>
        <b>${subtotalSum}€</b>
    `
    showSums();
    askForDeliveryCosts(subtotalSum);
    rendertotalSum(subtotalSum);
    askForMinValue(subtotalSum);

}


function askForDeliveryCosts(sub){
    let deliveryCosts = document.getElementById('lieferkosten');
    if(sub < 30){
        deliveryCosts.innerHTML = /*html*/`
            <div class="deliveryCosts">
                <b>Lieferkosten</b>
                <b>4.00€</b>
            </div> 
            <div class="deliveryText">
                <p>Ab einem Wert von 30€ halbieren sich die Lieferkosten</p>
            </div>
            
        `}else{
            deliveryCosts.innerHTML = /*html*/`
            <div class="deliveryCosts">
                <b>Lieferkosten</b>
                <b>2.00€</b>
            </div> `;
        }
}


function rendertotalSum(sub){
    let totalCosts = document.getElementById('gesamtkosten');
    let totalWithDelivery = (Number(sub) + 4).toFixed(2);
    let totalHalfDelivery = (Number(sub) + 2).toFixed(2);
    if(sub < 30){
        totalCosts.innerHTML = /*html*/`
            <b>Gesamtkosten</b>
            <b>${totalWithDelivery}€</b>
        `
    }else{
        totalCosts.innerHTML = /*html*/`
            <b>Gesamtkosten</b>
            <b>${totalHalfDelivery}€</b>
            `
    }    
}


function askForMinValue(sub){
    let minValue = document.getElementById('orderMin');
    let untilOrder = (18 - Number(sub)).toFixed(2);
    if(sub < 18){
        minValue.innerHTML = /*html*/`
            <b>Betrags bis zum Mindestbestellwert</b>
            <b>${untilOrder}€</b>
        `
    }else{
        minValue.innerHTML = '';
    }
}


function askForNotation(m) {
    if (notationWarenkorb[m] != '') {
        document.getElementById(`annotation${m}`).innerHTML = /*html*/`
            
                <div class="notefield">
                    ${notationWarenkorb[m]}
                </div>
                <div class="iconsNote">
                    <img src="img/edit.svg" onclick="notation(${m})" alt="Anmerkung ändern" title="Anmerkung ändern">   
                    <img src="img/close_18.svg" onclick="deleteNotation(${m})" alt="Anmerkung löschen" title="Anmerkung löschen">   
                </div>      
            `
            document.getElementById(`imgNotation${m}`).classList.add('d-none');
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
        notationWarenkorb.splice(m, 1);
        deleteSums();
    }
    saveArray();
    renderWarenkorb();
}


function deleteAll(m) {
    menuWarenkorb.splice(m, 1);
    preisWarenkorb.splice(m, 1);
    mengeWarenkorb.splice(m, 1);
    notationWarenkorb.splice(m, 1);
    deleteSums();
    saveArray();
    renderWarenkorb();
}


function notation(m) {
    let notation = document.getElementById(`annotation${m}`);
    notation.innerHTML = /*html*/`
    <div class="notation">
        <textarea name="Annotation" id="note${m}" maxlength=100 title="Anmerkung">${notationWarenkorb[m]}</textarea>
        <div class="notationSave">
            <button class="mini-btn"><img src="img/done_white_18.svg" onclick="saveNotation(${m})" alt=""></button>
            <button class="mini-btn"><img src="img/close_white_18.svg" onclick="closeNotation(${m})" alt=""></button>
        </div>
    </div>
    `
}


function saveNotation(m) {
    let note = document.getElementById(`note${m}`).value;
    notationWarenkorb.splice(m, 1, note);       // ersetzt ein Element an der m-ten Stell durch den wert von note    
    saveArray();
    renderWarenkorb();
}


function closeNotation(m){
    renderWarenkorb();
}


function deleteNotation(m){
    notationWarenkorb.splice(m, 1, '');
    saveArray();
    renderWarenkorb();
}


function deleteSums(){
    document.getElementById('warenkorbSum').classList.add('v-none');
    document.getElementById('orderMin').classList.add('v-none');
    document.getElementById('warenkorbBestellen').classList.add('v-none');
}


function showSums(){
    document.getElementById('warenkorbSum').classList.remove('v-none');
    document.getElementById('orderMin').classList.remove('v-none');
    document.getElementById('warenkorbBestellen').classList.remove('v-none');
    
}



            /***Local Storage***/

function saveArray() {
    localStorage.setItem('meal', JSON.stringify(menuWarenkorb));
    localStorage.setItem('price', JSON.stringify(preisWarenkorb));
    localStorage.setItem('amount', JSON.stringify(mengeWarenkorb));
    localStorage.setItem('notation', JSON.stringify(notationWarenkorb));
}


function loadArray() {
    let loadMenu = localStorage.getItem('meal');
    let loadPrice = localStorage.getItem('price');
    let loadAmount = localStorage.getItem('amount');
    let loadNotation = localStorage.getItem('notation');
    if (loadMenu != null) {
        menuWarenkorb = JSON.parse(loadMenu);
        preisWarenkorb = JSON.parse(loadPrice);
        mengeWarenkorb = JSON.parse(loadAmount);
        notationWarenkorb = JSON.parse(loadNotation);
    }
}
