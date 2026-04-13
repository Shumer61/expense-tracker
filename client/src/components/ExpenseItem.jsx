function ExpenseItem({ expense, onDelete }) {
    return(
        <div className="expense-item">
            <div className="expense-info">
                <h3>{expense.title}</h3>
                <span className="category">{expense.category}</span>
                <span className="date">
                    {new Date(expense.date).toLocaleDateString()}
                </span>
            </div>
            <div className="expense-right">
                <span className="amount">KES {expense.amount}</span>
                <button onClick={() => onDelete(expense._id)} className="delete-btn">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ExpenseItem