import ExpenseItem from './ExpenseItem'

function ExpenseList({ expenses, onDelete }) {
  if(expenses.length === 0) {
    return (
      <div className="empty-list">
        <p>No expenses yet. Add your first one above.</p>
      </div>
    )
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ExpenseList