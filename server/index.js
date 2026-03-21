require('dotenv').config();
const connectDB = require('./db');
const express = require('express');
const app = express();

connectDB();

app.use(express.json());

const expenseRoutes = require('./routes/expenses');
app.use('/expenses', expenseRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Expense tracker API is running' });
});
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});