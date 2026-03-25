const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const protect = require('../middleware/auth');

// GET all expenses — only return user's own expenses
router.get('/', protect, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId });
        res.json(expenses);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new expense — attach user to expense
router.post('/', protect, async (req, res) => {
    try {
        const expense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            user: req.userId
        });
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update expense — only update if belongs to user
router.put('/:id', protect, async (req, res) => {
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );
        if(!updatedExpense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE expense — only delete if belongs to user
router.delete('/:id', protect, async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted' });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;