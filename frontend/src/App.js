import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './components/UserList';
import TransactionList from './components/TransactionList';
import AddUser from './components/AddUser';
import AddTransaction from './components/AddTransaction';

const App = () => {
  return (
    // <Router>
      
    //      {/* <Route exact path="/" component={UserList} />
    //      <Route exact path="/transactions" component={TransactionList} />
    //      <Route exact path="/add-user" component={AddUser} /> */}
    //      <Route exact path="/add-transaction" component={AddTransaction} />
      
    //  </Router>
    <div>
     <h1>Hello</h1>
     <TransactionList/>
    {/* <AddTransaction/> */}
    <AddUser/>
    
    {/* <UserList/> */}
    </div>
  );
};

export default App;
