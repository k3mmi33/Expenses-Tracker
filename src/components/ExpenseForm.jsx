import { useState } from 'react';

function ExpenseForm({ addExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.category || !formData.amount || !formData.date) {
      alert('Please fill out all fields');
      return;
    }

    // Convert amount to number
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    // Add the expense
    addExpense(newExpense);

    // Reset form
    setFormData({
      name: '',
      category: '',
      amount: '',
      date: ''
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Expense Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Groceries"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Food"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount (/=):</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;