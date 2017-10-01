import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    componentDidMount(){
        this.props.history.push("/Painel/Analisador")
    }

    render(){
        return(
            <div className="background-login">
                <div className="login-form">
                    <div className="input-group" >
                        <span className="input-group-addon" id="basic-addon1">Login</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <br/>
                    <div className="input-group" >
                        <span className="input-group-addon" id="basic-addon1">Senha</span>
                        <input type="text" className="form-control" placeholder="Senha" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <br/>
                    <button className="btn btn-primary">Logar</button>
                    <br/>
                    <br/>
                    <Link to="/Painel/Analisador" >Não realizar login</Link>
                </div>
            </div>
        );
    }
};