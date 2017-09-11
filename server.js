var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());

const analisar = function(codigo){
    const tamanho = codigo.length;
    var response = {
        quantidadeDeTokens: 0,
        tokens: [
            
        ],
        erros: [
            { id: 1, linha: 1, descricao: "Erro" }
        ]
    }

    let linha = 1;

    for(pos = 0; pos < tamanho; pos++){
        if(codigo.charAt(pos) === 'þ'){
            linha++;
        }else{
            switch(codigo.charAt(pos)){
                case '$' : 
                    aposanalise = analisarIdentificador( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '{':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '{', codigo: 1 , linha});
                    pos++
                    break;
                case '}':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '}', codigo: 1 , linha});
                    pos++;
                    break;
                case '+' : 
                    aposanalise = analisarPlus( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '-' : 
                    aposanalise = analisarMinus( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '=' : 
                    aposanalise = analisarEqual( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                
                default: pos++; break;
            }
            pos--;
        }
    }
    return response;
}

const analisarIdentificador = function(pos , response, codigo, linha){
    pos++;
    var identificador = "$";
    var checker = new RegExp("[a-zA-Z0-9]+");
    while(checker.exec(codigo.charAt(pos))){
        identificador += codigo.charAt(pos);
        pos++;
    }
    response.quantidadeDeTokens++;
    response.tokens.push({ id: response.quantidadeDeTokens, token: identificador, codigo: 1 , linha});
    return { pos, response }
};

const analisarPlus = function(pos , response, codigo, linha){
    pos++;
    var token = "+";
    response.quantidadeDeTokens++;
    if(codigo.charAt(pos) == '+'){
        token += "+";
        pos++;
        response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 24 , linha});
        return { pos, response }
    }else if (codigo.charAt(pos) == '='){
        token += "=";
        pos++;
        response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 23 , linha});
        return { pos, response }
    }
    response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 51 , linha});
    return { pos, response }
};

const analisarMinus = function(pos , response, codigo, linha){
    pos++;
    var token = "-";
    response.quantidadeDeTokens++;
    if(codigo.charAt(pos) == '-'){
        token += "-";
        pos++;
        response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 11 , linha});
        return { pos, response }
    }else if (codigo.charAt(pos) == '='){
        token += "=";
        pos++;
        response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 12 , linha});
        return { pos, response }
    }
    response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 13 , linha});
    return { pos, response }
};

const analisarEqual = function(pos , response, codigo, linha){
    pos++;
    var token = "=";
    response.quantidadeDeTokens++;
    if(codigo.charAt(pos) == '='){
        token += "=";
        pos++;
        response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 45 , linha});
        return { pos, response }
    }
    response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 47 , linha});
    return { pos, response }
};

app.get('/', function(req, res){
    res.sendFile(soma);
});

app.all('/analise', function(req, res){
    console.log(req.body);
    const analise = analisar(req.body.codigo);
    res.json(analise);
});



app.listen(3001, function () {
    console.log('Servidor iniciador');
});