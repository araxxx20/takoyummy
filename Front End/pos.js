let total = 0;
let orderDetails = [];  // This array will hold the order details

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    let quantityElement = card.querySelector('.product-quantity');
    let addButton = card.querySelector('.add');
    let minusButton = card.querySelector('.minus');
    let priceElement = card.querySelector('.price');
    let productName = card.querySelector('p').textContent;
    let orderSummary = document.querySelector('#order-summary-list');

    let num = 0;

    addButton.addEventListener('click', () => {
        num += 1;
        quantityElement.innerHTML = num;
        updateOrderSummary();
    });

    minusButton.addEventListener('click', () => {
        if (num > 0) {
            num--;
            quantityElement.innerHTML = num;
            updateOrderSummary();
        }
    });

    function updateOrderSummary() {
        let productIndex = orderDetails.findIndex(item => item.name === productName);

        if (productIndex > -1) {
            orderDetails[productIndex].quantity = num;
        } else {
            orderDetails.push({ name: productName, quantity: num, price: parseFloat(priceElement.innerHTML) });
        }

        renderOrderSummary();
    }

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
        orderSummary.innerHTML = orderHTML;

        if (!document.querySelector('.payment-section')) {
            const paymentSection = `
                <div class="total">Total: ₱${total.toFixed(2)}</div>
                <div class="payment-section">
                    <h3>Payment</h3>
                    <input class="input1" type="text" placeholder="Enter Payment">
                    <div class="change">Change: </div>
                </div>
            `;
            orderSummary.insertAdjacentHTML('beforeend', paymentSection);
        } else {
            document.querySelector('.total').innerHTML = `Total: ₱${total.toFixed(2)}`;
        }

        bindPaymentInputEvent();
        bindSubmitOrderEvent();
    }

    function bindPaymentInputEvent() {
        const paymentInput = document.querySelector('.input1');
        const changeDisplay = document.querySelector('.change');

        paymentInput.addEventListener('input', () => {
            const payment = parseFloat(paymentInput.value);
            if (isNaN(payment) || payment <= 0) {
                changeDisplay.innerHTML = "Change: Please enter a valid amount.";
                return;
            }

            const change = payment - total;
            if (change < 0) {
                changeDisplay.innerHTML = "Change: Insufficient funds";
            } else {
                changeDisplay.innerHTML = `Change: ₱${change.toFixed(2)}`;
            }
        });
    }

    function bindSubmitOrderEvent() {
        document.getElementById('submitOrder').addEventListener('click', submitOrder);
    }
});

// Submit Order Function
async function submitOrder() {
    try {
        const paymentInput = parseFloat(document.querySelector('.input1').value);
        console.log('Submitting order:', orderDetails);

        const response = await fetch('/pos/submit-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: orderDetails.filter(item => item.quantity > 0),
                payment: paymentInput,
            }),
        });

        const result = await response.json();
        console.log('Response:', result);

        if (response.ok) {
            alert('Order submitted successfully!');
            showReceipt(result.order);
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error submitting order:', error);
    }
}

function showReceipt(order) {
    const modal = document.createElement('div');
    modal.classList.add('receipt-modal');
    modal.innerHTML = `
        <h2>Receipt</h2>
        <div>${order.items.map(item => `${item.name} x${item.quantity}`).join('<br>')}</div>
        <p>Total: ₱${order.totalPrice.toFixed(2)}</p>
        <p>Payment: ₱${order.payment.toFixed(2)}</p>
        <p>Change: ₱${order.change.toFixed(2)}</p>
        <button onclick="closeReceipt()">Close</button>
    `;
    document.body.appendChild(modal);
}

function closeReceipt() {
    document.querySelector('.receipt-modal').remove();
}
