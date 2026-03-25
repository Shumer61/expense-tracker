import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseTotal from './components/ExpenseTotal'
import AISummary from './components/AISummary'
import './App.css'

function App(){
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

 useEffect(() => {
    const fetchExpenses = async () => {
        try {
            const response = await fetch('/api/expenses')
            const data = await response.json()
            setExpenses(data)
        } catch(error) {
            console.log('Error fetching expenses:', error)
        }
    }

    fetchExpenses()
}, [])

  const handleAdd = (newExpense) => {
    setExpenses(prev => {
        const exists = prev.find(e => e._id === newExpense._id)
        if(exists) return prev
        return [...prev, newExpense]
    })
}
  const handleDelete = (id) =>{
    setExpenses(expenses.filter((expense) => expense._id !==id))
  }
  const filteredExpenses = selectedCategory === 'all'
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory)

  return (
    <div className="app">
        <h1>Expense Tracker</h1>
        <ExpenseTotal expenses={filteredExpenses} />
        {/*<AISummary />*/} 
        
        <div className="filter-bar">
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
            >
                <option value="all">All Categories</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="housing">Housing</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
            </select>
        </div>

        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
    </div>
)
}

export default App