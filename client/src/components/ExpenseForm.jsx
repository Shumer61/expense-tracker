import { useState } from 'react'

function ExpenseForm({ onAdd, token }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(formData)
      })

      const newExpense = await response.json()
      onAdd(newExpense)

      setFormData({ title: '', amount: '', category: 'food', date: '' })
    } catch(error) {
      console.log('Error adding expense:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>

      <input
        type="text"
        name="title"
        placeholder="Expense title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount (KES)"
        value={formData.amount}
        onChange={handleChange}
        onWheel={(e)  => e.target.blur()}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="housing">Housing</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="other">Other</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit">Add Expense</button>
    </form>
  )
}

export default ExpenseForm