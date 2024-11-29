const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    payment: { type: Number, required: true },
    change: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
