// src/App.jsx
import { useState } from 'react';
import './App.css';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';

function App() {
  // Initial mock data for expenses
  const initialExpenses = [
    { id: 1, name: "Groceries", category: "Food", amount: 5000.00, date: "2025-04-10" },
    { id: 2, name: "Netflix", category: "Entertainment", amount: 700.00, date: "2025-04-08" },
    { id: 3, name: "Fare", category: "Transportation", amount: 1200.00, date: "2025-04-07" },
    { id: 4, name: "WI-FI", category: "Utilities", amount: 1500.00, date: "2025-04-05" }
  ];

  // State
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Add a new expense
  const addExpense = (newExpense) => {
    // Create a new expense with a unique ID
    const expenseWithId = {
      ...newExpense,
      id: expenses.length > 0 ? Math.max(...expenses.map(exp => exp.id)) + 1 : 1
    };
    setExpenses([...expenses, expenseWithId]);
  };

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense => {
    return expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort expenses
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to filtered expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortConfig.key) {
      const keyA = a[sortConfig.key].toLowerCase();
      const keyB = b[sortConfig.key].toLowerCase();

      if (keyA < keyB) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (keyA > keyB) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>

      <div className="app-container">
        <div className="left-column">
          <h2>Add New Expense</h2>
          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="right-column">
          <h2>Your Expenses</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ExpenseTable
            expenses={sortedExpenses}
            deleteExpense={deleteExpense}
            requestSort={requestSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>
    </div>
  );
}

export default App;