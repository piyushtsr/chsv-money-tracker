const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
