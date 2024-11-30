
let total = 0;
let orderDetails = [];  // This array will hold the order details


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

    let productName = card.querySelector('p').textContent;  // Get product name
    let orderSummary = document.querySelector('.order-summary');

    let num = 0;

    // Event listeners for add and minus buttons
    addButton.addEventListener('click', () => {
        num += 1;
        quantityElement.innerHTML = num;

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

            updateOrderSummary();
        }
    });

    // Function to update the order summary
    function updateOrderSummary() {
        // Check if product is already in order details
        let productIndex = orderDetails.findIndex(item => item.name === productName);

        if (productIndex > -1) {
            orderDetails[productIndex].quantity = num;
        } else {
            orderDetails.push({ name: productName, quantity: num, price: parseFloat(priceElement.innerHTML) });
        }

        renderOrderSummary();
    }

    // Function to render the order summary
    function renderOrderSummary() {
        let orderHTML = "";
        let newTotal = 0;

        orderDetails.forEach(item => {
            if (item.quantity > 0) {
                orderHTML += `
                    <div class="order-item">
                        <div class="item-details">${item.name} x${item.quantity}</div>
                        <div class="item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `;
                newTotal += item.price * item.quantity;
            }
        });

        total = newTotal;

        // Update the order summary in the DOM
        orderSummary.innerHTML = `
            <h2>Order Summary</h2>
            ${orderHTML}
            <div class="total">Total: ₱${total.toFixed(2)}</div>
            <div class="payment-section">
                <h3>Payment</h3>
                <input class="input1" type="text" placeholder="Enter Payment">
                <div class="keypad">
                    <button id="calculateChange" class="calculateChange">Calculate Change</button>
                </div>
                <div class="change">Change: </div>
            </div>
        `;
        
        // Re-bind the event listener for the Calculate Change button after rendering the order summary
        bindChangeButtonEvent();

            count();
        }
    });

    function count() {
        slip.innerHTML = num;
        total = num * parseFloat(priceElement.innerHTML);
        partial.innerHTML = total.toFixed(2); // Format the total to 2 decimal places
    }
});


    // Bind the event listener for calculating change
    function bindChangeButtonEvent() {
        let sukli = document.querySelector('.change');
        let money = document.querySelector('.input1');
        let changeButton = document.querySelector('.calculateChange');

        changeButton.addEventListener('click', () => {
            let money2 = parseFloat(money.value);

            console.log('Payment entered:', money2); // Check the payment value here

            if (isNaN(money2) || money2 <= 0) {
                sukli.innerHTML = "Change: Please enter a valid amount.";
                return;
            }

            let clientChange = money2 - total;
            console.log('Change:', clientChange); // Check the calculated change

            if (clientChange < 0) {
                sukli.innerHTML = "Change: Insufficient funds";
            } else {
                sukli.innerHTML = `Change: ₱${clientChange.toFixed(2)}`;
            }
        });
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
