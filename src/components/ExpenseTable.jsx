function ExpenseTable({ expenses, deleteExpense, requestSort, sortConfig }) {
    const getClassForSortHeader = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <div className="expense-table-container">
        {expenses.length === 0 ? (
          <p>No expenses found. Add an expense or modify your search.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('name')} className={getClassForSortHeader('name')}>
                  Expense Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th onClick={() => requestSort('category')} className={getClassForSortHeader('category')}>
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount.toFixed(2)}/=</td>
                  <td>{expense.date}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  export default ExpenseTable;
