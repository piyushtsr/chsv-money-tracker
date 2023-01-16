
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TransactionList.module.css'
import AddTransaction from './AddTransaction';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/transactions')
      .then(res => {
        setTransactions(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDeleteTransaction = (transactionId) => {
    axios.delete(`http://localhost:3001/api/transactions/${transactionId}`)
      .then(res => {
        setTransactions(transactions.filter(transaction => transaction._id !== transactionId));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowAddTransaction(true);
  };

  return (
    <>
    <div>
    <h2>Transaction List</h2>
    <button onClick={() => setShowAddTransaction(!showAddTransaction)}>
        {showAddTransaction ? 'Close' : 'Add Transaction'}
      </button>
      {showAddTransaction && <AddTransaction transaction={selectedTransaction} onClose={() => setShowAddTransaction(false)} />}
    </div>
    
    
      {/* <button onClick={() => setShowAddTransaction(true)}>Add Transaction</button> */}
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th >Users</th>
            <th >Category</th>
            <th >Amount</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.users.join(', ')}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => handleUpdateTransaction(transaction)}>Edit</button>
                <button onClick={() => handleDeleteTransaction(transaction._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    
    </>
  );
};

export default TransactionList;




