const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
        enum: ['food', 'transport','housing','entertainment','health','other']
    },
    date:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;