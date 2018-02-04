import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import Layout from './Layout';
import 'normalize.css';
import './App.css';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route component={Layout}/>
    </Switch>
  </Router>
);

export default App;
