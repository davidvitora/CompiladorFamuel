var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var tokenAna = require('./TokenAna')();
var SintaticoAna = require('./SintaticoAna')();
app.use('/files', express.static('public'));
app.use(bodyParser.json());

var MemoryStore =session.MemoryStore;

app.use(session({ 
    name: "compilatorsessionid", 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: 'false',
    cookie: { maxAge: 60000 }}));

const analisar = function(codigo){
    var checkerLetra = new RegExp("[a-zA-Z]+");
    var checkerNumero = new RegExp("[0-9]+");
    const tamanho = codigo.length;
    var response = {
        linha: 1,
        quantidadeDeTokens: 0,
        possuiErro: false,
        tokens: [
            
        ],
        erros: [
        ],
        sintatico: { possuiErro: false, erro: {}, quantidadeDePilhas: 0 , listaPilhaDeAnalise: [] }
    }

    for(pos = 0; pos < tamanho; pos++){
        if(response.possuiErro == true){
            return response;
        }
        if(codigo.charAt(pos) === 'þ'){
            response.linha++;
        }else{
            if(checkerLetra.exec(codigo.charAt(pos))){
                aposanalise = tokenAna.analisarCharSeq( pos, response, codigo);
                pos = aposanalise.pos;
                response = aposanalise.response;
                continue;
            }
            if(checkerNumero.exec(codigo.charAt(pos))){
                aposanalise = tokenAna.analisarNumero( pos, response, codigo);
                pos = aposanalise.pos;
                response = aposanalise.response;
                continue;
            }
            switch(codigo.charAt(pos)){
                case '$' : 
                    aposanalise = tokenAna.analisarIdentificador( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '#' : 
                    aposanalise = tokenAna.analisarHash( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '"' : 
                    aposanalise = tokenAna.analisarNomeString( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '\'' : 
                    aposanalise = tokenAna.analisarChar( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '{':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '{', codigo: 36 , linha : response.linha});
                    pos++
                    break;
                case '}':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '}', codigo: 35 , linha : response.linha});
                    pos++;
                    break;
                case ';':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ';', codigo: 37 , linha : response.linha});
                    pos++;
                    break;
                case ':':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ':', codigo: 38 , linha : response.linha});
                    pos++;
                    break;
                case '/':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '/', codigo: 39 , linha : response.linha});
                    pos++;
                    break;
                case ',':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ',', codigo: 40 , linha : response.linha});
                    pos++;
                    break;
                case ')':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: ')', codigo: 42 , linha : response.linha});
                    pos++;
                    break;
                case '(':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '(', codigo: 43 , linha : response.linha});
                    pos++;
                    break;
                case '*':
                    response.quantidadeDeTokens++;
                    response.tokens.push({ id: response.quantidadeDeTokens, token: '*', codigo: 41 , linha : response.linha});
                    pos++;
                    break;
                case '+' : 
                    aposanalise = tokenAna.analisarPlus( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '-' : 
                    aposanalise = tokenAna.analisarMinus( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '!' : 
                    aposanalise = tokenAna.analisarDiff( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '=' : 
                    aposanalise = tokenAna.analisarEqual( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '<' : 
                    if(codigo.charAt(pos + 1) == '*' ){
                        aposanalise = tokenAna.analisarComentario( pos, response, codigo);
                    }else{
                        aposanalise = tokenAna.analisarMenor( pos, response, codigo);
                    }
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                case '>' : 
                    aposanalise = tokenAna.analisarMaior( pos, response, codigo);
                    pos = aposanalise.pos;
                    response = aposanalise.response;
                    break;
                default:
                    if(codigo.charAt(pos) == ' ' || codigo.charAt(pos) == '\t'){ 
                        pos++; 
                        break;
                    } else if( codigo.charAt(pos) != 'æ') {
                        response.erros.push({ id: 1, linha : response.linha , descricao: "Token " + codigo.charAt(pos) + " invalido" });
                        return response;
                    } else  if( codigo.charAt(pos) == 'æ') {
                        response.quantidadeDeTokens++;
                        response.tokens.push({ id: response.quantidadeDeTokens, token: 'Fim de arquivo', codigo: 44 , linha : response.linha});
                        return response;
                    }
                    return response;
            }
            pos--;
        }
    }
    return response;
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/Painel/Analisador', function(req, res){
    res.redirect("/");
});


app.all('/analise', function(req, res){
    console.log(req.body);
    const analise = analisar(req.body.codigo + 'æ');
    if(analise.possuiErro == false){
        SintaticoAna.analisar_sintatico(analise);
    }
    res.json(analise);
});

app.listen(3000, function () {
    console.log('Servidor iniciador');
});