import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUser from './AddUser';
import styles from './AddTransaction.module.css'

const AddTransaction = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [splitAmount, setSplitAmount] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => {
        setUsers(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const category=[["Needs",1], ["Luxury",2], ["Saving",3], ["Misc",4]]

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setSplitAmount(amount / selectedUsers.length);
    }
  }, [selectedUsers, amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      users: selectedUsers,
      category: selectedCategory,
      amount: amount,
    };
    axios.post('http://localhost:3001/api/transactions', transaction)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUsersChange = (e) => {
    setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className={styles.addtransactioncontainer}>
      <h2>Add Transaction</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Users:
          <select  className={styles.select} multiple= {true} onChange={handleUsersChange}>
            {users.map(user => (
              <option className={styles.option} key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </label>
        

        
        <label className={styles.label}>
          Category:
          <select className={styles.select} onChange={handleCategoryChange}>
            {category.map(cat => (
              <option className={styles.option}  key={cat[1]} value={cat[0]}>{cat[0]}</option>
            ))}
          </select>
        </label>
        <br />
        <label className={styles.label}>
          Amount:
          <input className={styles.input} type="number" value={amount} onChange={handleAmountChange} required />
        </label>
        <br />
        <button className={styles.button} type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;


