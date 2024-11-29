const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Route: Calculate total price, handle payment, and process order
router.post('/calculate', async (req, res) => {
    try {
        const { items, payment } = req.body;

        // Calculate total price from the items
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Calculate change
        const change = payment - totalPrice;

        if (change < 0) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Create and save the order
        const newOrder = new Order({
            items,
            totalPrice,
            payment,
            change,
        });
        await newOrder.save();

         // Save each item as a sale in the Sale model
         for (const item of items) {
            const newSale = new Sale({
                product: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity,
            });
            await newSale.save();
        }

        res.status(201).json({
            message: 'Order processed successfully!',
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
