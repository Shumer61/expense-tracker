import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseTotal from './components/ExpenseTotal'
import './App.css'

function App(){
  const [expenses, setExpenses] = useState([])

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

  return(
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseTotal expenses={expenses} />
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  )
}

export default App