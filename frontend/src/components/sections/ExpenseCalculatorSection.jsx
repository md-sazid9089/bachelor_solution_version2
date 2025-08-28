import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faPlus, 
  faMinus, 
  faTrash, 
  faRupeeSign,
  faCalendarAlt,
  faUtensils,
  faCar,
  faHome,
  faGamepad,
  faShoppingBag,
  faMedkit,
  faGraduationCap,
  faEllipsisH,
  faEdit,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ExpenseCalculatorSection = ({ id }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: 'food',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  const categories = [
    { id: 'food', label: 'Food & Dining', icon: faUtensils, color: '#ff6b6b' },
    { id: 'transportation', label: 'Transportation', icon: faCar, color: '#4ecdc4' },
    { id: 'utilities', label: 'Utilities', icon: faHome, color: '#45b7d1' },
    { id: 'entertainment', label: 'Entertainment', icon: faGamepad, color: '#96ceb4' },
    { id: 'shopping', label: 'Shopping', icon: faShoppingBag, color: '#feca57' },
    { id: 'healthcare', label: 'Healthcare', icon: faMedkit, color: '#ff9ff3' },
    { id: 'education', label: 'Education', icon: faGraduationCap, color: '#54a0ff' },
    { id: 'other', label: 'Other', icon: faEllipsisH, color: '#5f27cd' }
  ];

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    setTotalExpenses(total);
  }, [expenses]);

  const formatCurrency = (amount) => {
    return `৳${amount}`;
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addExpense = () => {
    if (newExpense.amount && parseFloat(newExpense.amount) > 0) {
      const expense = {
        id: Date.now(),
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses(prev => [...prev, expense]);
      setNewExpense({
        category: 'food',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  const removeExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditingExpense({ ...expense });
  };

  const saveEdit = () => {
    if (editingExpense.amount && parseFloat(editingExpense.amount) > 0) {
      setExpenses(prev => prev.map(expense => 
        expense.id === editingId 
          ? { ...editingExpense, amount: parseFloat(editingExpense.amount) }
          : expense
      ));
      setEditingId(null);
      setEditingExpense({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingExpense({});
  };

  const clearAllExpenses = () => {
    setExpenses([]);
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    });
    return categoryTotals;
  };

  const categoryTotals = getExpensesByCategory();

  return (
    <section id={id} className="section expense-calculator-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2>
            <FontAwesomeIcon icon={faCalculator} />
            Expense Calculator
          </h2>
          <p>Track and manage your daily expenses with our smart calculator</p>
        </motion.div>

        <div className="expense-calculator-container">
          {/* Add New Expense Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="expense-form-card"
          >
            <div className="card-header">
              <h3>Add New Expense</h3>
            </div>
            <div className="expense-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={newExpense.category}
                    onChange={handleInputChange}
                    className="category-select"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                             <div className="form-group">
                  <label>Amount (tk)</label>
                  <div className="amount-input-group">
                    <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>৳</span>
                    <input
                      type="number"
                      name="amount"
                      value={newExpense.amount}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <div className="date-input-group">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <input
                      type="date"
                      name="date"
                      value={newExpense.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description (Optional)</label>
                  <input
                    type="text"
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    placeholder="Brief description..."
                  />
                </div>
              </div>
              <button className="add-expense-btn" onClick={addExpense}>
                <FontAwesomeIcon icon={faPlus} />
                Add Expense
              </button>
            </div>
          </motion.div>

          {/* Total Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="expense-summary-card"
          >
            <div className="total-amount">
              <h3>Total Expenses</h3>
              <div className="amount-display">
                {formatCurrency(totalExpenses)}
              </div>
            </div>
            {expenses.length > 0 && (
              <button className="clear-all-btn" onClick={clearAllExpenses}>
                <FontAwesomeIcon icon={faTrash} />
                Clear All
              </button>
            )}
          </motion.div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(categoryTotals).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="category-breakdown"
          >
            <h3>Expenses by Category</h3>
            <div className="category-grid">
              {Object.entries(categoryTotals).map(([categoryId, amount]) => {
                const categoryInfo = getCategoryInfo(categoryId);
                const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                return (
                  <div key={categoryId} className="category-item">
                    <div className="category-icon" style={{ backgroundColor: categoryInfo.color }}>
                      <FontAwesomeIcon icon={categoryInfo.icon} />
                    </div>
                    <div className="category-details">
                      <h4>{categoryInfo.label}</h4>
                      <div className="category-amount">{formatCurrency(amount)}</div>
                      <div className="category-percentage">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Expenses List */}
        {expenses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="expenses-list-card"
          >
            <div className="card-header">
              <h3>Recent Expenses</h3>
              <span className="expense-count">{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="expenses-list">
              <AnimatePresence>
                {expenses.map((expense, index) => {
                  const categoryInfo = getCategoryInfo(expense.category);
                  const isEditing = editingId === expense.id;
                  
                  return (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="expense-item"
                    >
                      <div className="expense-icon" style={{ backgroundColor: categoryInfo.color }}>
                        <FontAwesomeIcon icon={categoryInfo.icon} />
                      </div>
                      
                      {isEditing ? (
                        <div className="expense-edit-form">
                          <div className="edit-row">
                            <select
                              name="category"
                              value={editingExpense.category}
                              onChange={handleEditInputChange}
                              className="edit-select"
                            >
                              {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                  {category.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              name="amount"
                              value={editingExpense.amount}
                              onChange={handleEditInputChange}
                              className="edit-amount"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="edit-row">
                            <input
                              type="date"
                              name="date"
                              value={editingExpense.date}
                              onChange={handleEditInputChange}
                              className="edit-date"
                            />
                            <input
                              type="text"
                              name="description"
                              value={editingExpense.description}
                              onChange={handleEditInputChange}
                              placeholder="Description..."
                              className="edit-description"
                            />
                          </div>
                          <div className="edit-actions">
                            <button className="save-btn" onClick={saveEdit}>
                              <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button className="cancel-btn" onClick={cancelEdit}>
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="expense-details">
                            <div className="expense-category">{categoryInfo.label}</div>
                            <div className="expense-description">
                              {expense.description || 'No description'}
                            </div>
                            <div className="expense-date">
                              {new Date(expense.date).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                          <div className="expense-amount">
                            {formatCurrency(expense.amount)}
                          </div>
                          <div className="expense-actions">
                            <button 
                              className="edit-btn"
                              onClick={() => startEditing(expense)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button 
                              className="delete-btn"
                              onClick={() => removeExpense(expense.id)}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {expenses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state"
          >
            <FontAwesomeIcon icon={faCalculator} />
            <h3>No expenses yet</h3>
            <p>Start by adding your first expense above</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExpenseCalculatorSection;