let menus = ["Lasagne", "Nudels"];
let prices = [8.99, 5.0];
let amounts = [1, 3];

function getValueFromInput(i){
  return document.getElementById(`${i}`).value;
}

function getMenuFromInput(){
  return getValueFromInput("menu").trim();
}

function getPriceFromInput(){
  return Number(getValueFromInput("price"));  
}

function onAddMenu(){
  if (getMenuIndex(getMenuFromInput()) ==  -1){
    menus.push(getMenuFromInput());
    prices.push(getPriceFromInput());
    amounts.push(1);
    }else{
      amounts[getMenuIndex(getMenuFromInput())] = amounts[getMenuIndex(getMenuFromInput())] + 1;
    }
}

function getMenuIndex(menu){
  return menus.indexOf(menu);  
}