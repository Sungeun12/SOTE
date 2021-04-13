import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateVote from './pages/CreateVote';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/createvote" component={CreateVote} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
