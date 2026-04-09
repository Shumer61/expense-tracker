require('dotenv').config();
const connectDB = require('./db');
const express = require('express');
const app = express();

connectDB();

const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://expense-tracker-biro.onrender.com',
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());

const expenseRoutes = require('./routes/expenses');
const summaryRoute = require('./routes/summary');
const authRoutes = require('./routes/auth');

app.use('/expenses', expenseRoutes);
app.use('/summary', summaryRoute);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Expense tracker API is running' });
});
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});