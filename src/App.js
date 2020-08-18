import React from "react";
import { Switch, Route } from 'react-router-dom';

// component imports
import Home from './components/home.js';
import OrderForm from './components/order_form.js'

const App = () => {

  return (
    <>
      <h1>Lambda Eats</h1>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/order_form' component={OrderForm}/>
      </Switch>
    </>
  );
};
export default App;
