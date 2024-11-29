    const express = require('express');
    const Sale = require('../models/orderModel');

    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            console.log("Received GET request for sales");
            const sales = await Sale.find().sort({ date: -1 });
            console.log("Fetched Sales Data:", sales);
            res.status(200).json(sales);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.error("Error fetching sales data:", err.message);
        }
    });


    module.exports = router;
