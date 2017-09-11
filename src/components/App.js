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
                            <Link className="btn btn-secondary" to="/"> Analisador </Link>
                        </div>
                        <div className="col-md-3"> 
                            <Link className="btn btn-secondary" to="/sobre"> Sobre </Link>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="container">
                        <Route exact path="/" component={Home}>
                        </Route>
                        <Route path="/sobre" component={Sobre}>
                        </Route>
                    </div>
                </div>
            </div>
        </Router>
    );
}

 /*<div className="col-md-4">    
    <div className="dropdown ">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Arquivo
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">Abrir</a>
            <a className="dropdown-item" href="#">Salvar</a>
        </div>
    </div>
</div>*/