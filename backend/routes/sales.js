const express = require('express');
const Sale = require('../models/salesModels');

const router = express.Router();

// POST /api/sales
router.post('/', async (req, res) => {
    try {
        const sale = new Sale(req.body);
        const savedSale = await sale.save();
        res.status(201).json({ message: 'Sale recorded successfully!', data: savedSale });
    } catch (error) {
        res.status(500).json({ message: 'Error saving sale', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().sort({ date: -1 }); // Sort by latest transaction
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
