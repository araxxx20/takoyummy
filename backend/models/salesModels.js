const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product: String,    // Product name
    quantity: Number,   // Quantity sold
    price: Number,      // Price per unit
    total: Number,      // Total sale amount
    date: { type: Date, default: Date.now } // Date of sale
});

module.exports = mongoose.model('Sale', saleSchema);
