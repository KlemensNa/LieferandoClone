function render(){
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
    <div #id="gerichtLeft${i}" class="menuCards">
        <div class="gerichtLeft">
            <h3>${menu['name']}</h3>
            <p>${menu['zutaten']}</p>
            <p>${menu['zusatzstoffe']}</p>
            <h3>${menu['preis']}€</h3>
        </div>
        <div class="gerichtRight">
            <img src="img/add.png" alt="Add">
        </div>
    </div>
    `
}

function zumWarenkorb(){
    let warenkorb = document.getElementById('warenkorbWaren');

}

function renderWarenkorb(){
    let warenkorb = document.getElementById('warenkorbWaren');
    if (warenkorb.value == null){
        keineWaren(warenkorb);
    }else{
        
    }
}

function keineWaren(warenkorb){
    warenkorb.innerHTML = /*html*/`
        <div id="leererKorb">
            <img src="img/einkaufswagen.png" alt="">
            <div>
                <h2>Füge deine Lieblingsspeisen zum Warenkorb dazu</h2>
            </div>
        </div>
    `
}