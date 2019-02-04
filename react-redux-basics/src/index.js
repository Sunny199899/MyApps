import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider} from 'react-redux';
import store from './store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './containers/Login'
import Register from './containers/Register'
import './App.scss'
require('dotenv').config()

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <div className="main">
            <Route exact path="/" component = {App}/>
            <Route path="/login" component = {Login}/>
            <Route path="/Register" component = {Register}/>
        </div>
    </BrowserRouter>
</Provider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
