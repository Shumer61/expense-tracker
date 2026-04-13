import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseTotal from './components/ExpenseTotal'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function AppContent() {
    const { user, token, logout } = useAuth()
    const [expenses, setExpenses] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showLogin, setShowLogin] = useState(true)

    useEffect(() => {
        if(!token) return

        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if(!response.ok) return

                const data = await response.json()
                setExpenses(data)
            } catch(error) {
                console.log('Error fetching expenses:', error)
            }
        }

        fetchExpenses()
    }, [token])

    const handleAdd = (newExpense) => {
        setExpenses(prev => {
            const exists = prev.find(e => e._id === newExpense._id)
            if(exists) return prev
            return [...prev, newExpense]
        })
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            })

            if(!response.ok) return

            setExpenses(expenses.filter((expense) => expense._id !== id))
        } catch(error) {
            console.log('Error deleting expense:', error)
        }
    }

    const filteredExpenses = selectedCategory === 'all'
        ? expenses
        : expenses.filter((expense) => expense.category === selectedCategory)

    if(!user){
        return showLogin
            ? <Login onSwitch={() => setShowLogin(false)} />
            : <Register onSwitch={() => setShowLogin(true)} />
    }

    return (
        <div className="app">
            <div className="app-header">
                <h1>Expense Tracker</h1>
                <div className="user-info">
                    <span>Hi, {user.name}</span>
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <ExpenseTotal expenses={filteredExpenses} />
            {/* <AISummary /> */}

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

            <ExpenseForm onAdd={handleAdd} token={token} />
            <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDelete}
                token={token}
            />
        </div>
    )
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App