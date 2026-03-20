const express = require('express');
const app = express();

app.use(express.json());

const expenseRoutes = require('./routes/expenses');
app.use('/expenses', expenseRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Expense tracker API is running' });
});
app.listen(5000, ()=>{
    console.log('Server running on port 5000')
});