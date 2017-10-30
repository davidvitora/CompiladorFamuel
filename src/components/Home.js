import React, { Component } from 'react';

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {analise: {
                linha: 1,
                quantidadeDeTokens: 1,
                possuiErro: false,
                tokens: [
                    
                ],
                erros: [
                ],
                sintatico: { possuiErro: false, erro: {}, quantidadeDePilhas: 0 , listaPilhaDeAnalise: [] }
            }
        };
    }

    analisar(isso){
        var conteudo = document.getElementById("TextArea").value;
        conteudo = conteudo.replace(new RegExp('\n', 'g'), 'þ');
        fetch("/analise", {
            method: "post",
            headers: {
                "Content-Length" : conteudo.length,
                "Content-Type" : "application/json",
                "charset": "utf-8"
            },
            body: JSON.stringify({ codigo : conteudo })

        }).then(function(response){
            response.json().then(function(json){
                isso.setState({ analise: json })
                console.log(json.tokens);
                console.log(json.sintatico);
            });
        });
    }

    listTokens(){
        return this.state.analise.tokens.map((token)=>{
            return (
                <tr key={token.id}>
                    <td>{ token.token }</td>
                    <td>{ token.codigo }</td>
                    <td>{ token.linha }</td>
                </tr>
            );
        });
    }

    listErros(){
        return this.state.analise.erros.map((erro)=>{
            return (
                <tr key={erro.id}>
                    <td>{ erro.linha }</td>
                    <td>{ erro.descricao }</td>
                </tr>
            );
        });
    }

    listPilha(){
        return this.state.analise.sintatico.listaPilhaDeAnalise.map((item)=>{
            return (
                <tr key={item.id}>
                    <td>{ item.pilha }</td>
                    <td>{ item.oX }</td>
                    <td>{ item.oa }</td>
                </tr>
            );
        });
    }


    render() {
        return (
            <div className="row">
                <div className=" col-md-6">
                    <div className="row">
                        <div className=" col-md-12">
                            <h4> Codigo Fonte </h4>
                            <textarea id="TextArea" className="textarea" placeholder="Digite o código" rows="18" cols="65">
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-md-12">
                            <button className="btn btn-danger" onClick={()=> { this.analisar(this) }}> Analisar </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="quadro">
                            <h4> Processo Léxico </h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Token</th>
                                        <th>Codigo</th>
                                        <th>Linha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.listTokens() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row erros">
                        <div className="quadro">
                            <h4> Erros </h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Linha</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.listErros() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row erros">
                        <div className="quadro">
                            <h4> Progresso da pilha </h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Pilha</th>
                                        <th>X</th>
                                        <th>a</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.listPilha() }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
