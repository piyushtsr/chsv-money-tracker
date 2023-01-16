// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const app = express();

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/budget-tracker', { useNewUrlParser: true });

// // User routes
// app.get('/api/users', (req, res) => {
//   // Retrieve all users from the database
// });

// app.post('/api/users', (req, res) => {
//   // Add a new user to the database
// });

// app.put('/api/users/:id', (req, res) => {
//   // Update an existing user in the database
// });

// app.delete('/api/users/:id', (req, res) => {
//   // Delete a user from the database
// });

// // Transaction routes
// app.get('/api/transactions', (req, res) => {
//   // Retrieve all transactions from the database
// });

// app.post('/api/transactions', (req, res) => {
//   // Add a new transaction to the database
// });

// app.put('/api/transactions/:id', (req, res) => {
//   // Update an existing transaction in the database
// });

// app.delete('/api/transactions/:id', (req, res) => {
//   // Delete a transaction from the database
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
// Import the necessary modules and models
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Transaction = require('./models/transaction');

const app = express();

app.use(cors());

app.use(bodyParser.json());
mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect('mongodb://localhost/budget-tracker', { useNewUrlParser: true });

// User routes
app.get('/api/users', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/api/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });

  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

app.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

app.delete('/api/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: 'User deleted' });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

// Transaction routes
app.get('/api/transactions', (req, res) => {
  Transaction.find()
    .then(transactions => {
      res.json(transactions);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/api/transactions', (req, res) => {
  const newTransaction = new Transaction({
    users: req.body.users,
    category: req.body.category,
    amount: req.body.amount
  });

  newTransaction
    .save()
    .then(transaction => {
      res.json(transaction);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

app.put('/api/transactions/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(transaction => {
        res.json(transaction);
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });
  
  app.delete('/api/transactions/:id', (req, res) => {
    Transaction.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({ message: 'Transaction deleted' });
      })
      .catch(err => {
        res.status(400).json({ error: err.message });
      });
  });
  

  app.listen(3001, () => {
  console.log('Server running on port 3001');
});