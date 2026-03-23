function ExpenseTotal({ expenses}){
    const total = expenses.reduce((sum, expense) =>{
        return sum + expense.amount
    }, 0)

    return (
        <div className="expense-total">
            <h2>Total Spending</h2>
            <span>KES {total.toLocaleString()}</span>
        </div>
    )
}

export default ExpenseTotal