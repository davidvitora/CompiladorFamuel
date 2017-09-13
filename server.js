var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var tokenAna = require('./TokenAna')();
app.use(express.static('public'));
app.use(bodyParser.json());


const analisar = function(codigo){
    var checker = new RegExp("[a-zA-Z]+");
    const tamanho = codigo.length;
    var response = {
        quantidadeDeTokens: 0,
        possuiErro: false,
        tokens: [
            
        ],
        erros: [
        ]
    }

    let linha = 1;

    for(pos = 0; pos < tamanho; pos++){
        if(codigo.charAt(pos) === 'þ'){
            linha++;
        }else{
            if(checker.exec(codigo.charAt(pos))){
                aposanalise = tokenAna.analisarCharSeq( pos, response, codigo, linha );
                pos = aposanalise.pos;
                response = aposanalise.response;
                continue;
            }
            switch(codigo.charAt(pos)){
                case '$' : 
                    aposanalise = tokenAna.analisarIdentificador( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '{':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '{', codigo: 36 , linha});
                    pos++
                    break;
                case '}':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '}', codigo: 35 , linha});
                    pos++;
                    break;
                case ';':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ';', codigo: 37 , linha});
                    pos++;
                    break;
                case ':':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '}', codigo: 38 , linha});
                    pos++;
                    break;
                case '/':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '/', codigo: 39 , linha});
                    pos++;
                    break;
                case ',':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ',', codigo: 40 , linha});
                    pos++;
                    break;
                case ':':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '*', codigo: 41 , linha});
                    pos++;
                    break;
                case ')':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ')', codigo: 42 , linha});
                    pos++;
                    break;
                case '(':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '(', codigo: 43 , linha});
                    pos++;
                    break;
                case '+' : 
                    aposanalise = tokenAna.analisarPlus( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '-' : 
                    aposanalise = tokenAna.analisarMinus( pos, response, codigo, linha );
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '=' : 
                    aposanalise = tokenAna.analisarEqual( pos, response, codigo, linha );
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