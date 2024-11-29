
let quantity = document.querySelector('.product-quantity');
let add = document.querySelector(".add");
let minus = document.querySelector(".minus");
let num = 0;
let total = 0;
console.log(quantity);
console.log(add);
console.log(minus);

// Update the event listeners to handle multiple products
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    let quantityElement = card.querySelector('.product-quantity');
    let addButton = card.querySelector('.add');
    let minusButton = card.querySelector('.minus');
    let priceElement = card.querySelector('.price');
    let slip = document.querySelector('.board-quantity');
    let partial = document.querySelector('.item-price2');

    let num = 0;

    addButton.addEventListener('click', () => {
        num += 1;
        quantityElement.innerHTML = num;
        count();
    });

    minusButton.addEventListener('click', () => {
        if (num > 0) {
            num--;
            quantityElement.innerHTML = num;
            count();
        }
    });

    function count() {
        slip.innerHTML = num;
        total = num * parseFloat(priceElement.innerHTML);
        partial.innerHTML = total.toFixed(2); // Format the total to 2 decimal places
    }
});


let sukli = document.querySelector('.change')
let money = document.querySelector('.input1')
let changeButton = document.querySelector('.calculateChange')

changeButton.addEventListener('click', () => {
    let money2 = money.value 
    let total2 = total

    let clientChange = money2 - total2;

   

    if(clientChange < 0){
        sukli.innerHTML = "Change: Insufficient funds"
    }else{
        sukli.innerHTML = ` ${clientChange}`

        
    }
})


console.log(num)
