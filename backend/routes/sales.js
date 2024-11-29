const express = require('express');
const Sale = require('../models/salesModels.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().sort({ date: -1 }); // Sort by latest transaction
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
