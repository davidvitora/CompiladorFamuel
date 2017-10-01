import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import Home from './Home';
import Sobre from './Sobre';



export default () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="row">
                        <div className="col-md-6">
                            <Link className="btn btn-secondary" to="/Painel/Analisador"> Analisador </Link>
                        </div>
                        <div className="col-md-3"> 
                            <Link className="btn btn-secondary" to="/Painel/Sobre"> Sobre </Link>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="container">
                        <Route exact path="/Painel/Analisador" component={Home}>
                        </Route>
                        <Route exact path="/Painel/Sobre" component={Sobre}>
                        </Route>
                    </div>
                </div>
            </div>
        </Router>
    );
}