import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import Home from './Home';
import Sobre from './Sobre';
import App from './App';
import Login from './Login';
import Painel from './Painel';



export default () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Login}>
                </Route>
                <Route path="/Painel/Analisador" component={Painel}>
                </Route>
            </div>
        </Router>
    );
}
