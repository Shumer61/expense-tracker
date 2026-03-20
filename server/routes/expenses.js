const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
    res.json({message: 'Get all expenses'});
});

router.post('/',(req, res) =>{
    res.json({message: 'Create new expense'});
});

router.put('/:id',(req, res) =>{
    res.json({message:'Update expense'});
});

router.delete('/:id', (req, res) =>{
    res.json({message: 'Delete expense'});
});

module.exports = router;