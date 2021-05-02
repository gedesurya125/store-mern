import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk  from 'redux-thunk';
import reducers from './reducers';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
 


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={LoginPage}/>
        <Route path="/home" component={App} />
        <Route path="/registration" component={RegistrationPage}/>
      </Switch>
    </Router>
    
  </Provider>,
  document.getElementById('root')
);











// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
