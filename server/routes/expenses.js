const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) =>{
    try{
        const expenses = await Expense.find();
        res.json(expenses);
    } catch(error){
        res.status(500).json({ message: error.message});
    }
});

router.post('/', async (req, res) =>{
    try{
        const expense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date
        });
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch(error){
        res.status(400).json({ message: error.message});
    }
});

router.put('/:id', async (req, res) =>{
    try{
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedExpense);
    } catch(error){
        res.status(400).json({ message: error.message});
    }
});

router.delete('/:id', async (req, res) =>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted'});
    } catch(error){
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;