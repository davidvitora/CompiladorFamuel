module.exports = () => { return ({
        analisarIdentificador: function(pos , response, codigo){
            pos++;
            var identificador = "$";
            var checker = new RegExp("[a-zA-Z0-9]+");
            while(checker.exec(codigo.charAt(pos))){
                identificador += codigo.charAt(pos);
                pos++;
            }
            if(identificador.length == 1){
                response.possuiErro = true;
                response.erros.push({ id: 1, linha : response.linha , descricao: "identificador invalido, deverá ter ao menos um caracter" }); 
            } else {
                response.quantidadeDeTokens++;
                response.tokens.push({ id: response.quantidadeDeTokens, token: identificador, codigo: 7 , linha : response.linha});
            }
            return { pos, response}
        },
        analisarNumero: function(pos , response, codigo){
            var numero = "";
            var checker = new RegExp("[0-9]+");
            response.quantidadeDeTokens++;
            while(checker.exec(codigo.charAt(pos))){
                numero += codigo.charAt(pos);
                pos++;
            }
            if(codigo.charAt(pos) == '.' && checker.exec(codigo.charAt(pos + 1))){
                numero += '.';
                pos++;
                while(checker.exec(codigo.charAt(pos))){
                    numero += codigo.charAt(pos);
                    pos++;
                }
                response.tokens.push({ id: response.quantidadeDeTokens, token: numero, codigo: 6 , linha : response.linha});
            } else{
                response.tokens.push({ id: response.quantidadeDeTokens, token: numero, codigo: 5 , linha : response.linha});
            }
            pos--;
            return { pos, response}
        },
        analisarChar: function(pos , response, codigo){
            pos++;
            var char = "'";
            if(codigo.charAt(pos) != 'æ' || codigo.charAt(pos) != 'þ'){
                if(codigo.charAt(pos +1) != '\''){
                    response.possuiErro = true;
                    response.erros.push({ id: 1, linha : response.linha , descricao: "Char deverá ter apenas um caracter, esperado \'"
                    + " após o " + codigo.charAt(pos)});
                    return { pos, response}
                }
                char += codigo.charAt(pos) + "'";
                pos += 2;
                response.quantidadeDeTokens++;
                response.tokens.push({ id: response.quantidadeDeTokens, token: char, codigo: 8 , linha : response.linha});
            } else{
                response.possuiErro = true;
                response.erros.push({ id: 1, linha : response.linha , descricao: "Não foi encontrado o simbolo de fechamento '" });                
            }
            return { pos, response}
        },
        analisarComentario: function(pos , response, codigo){
            pos++;
            var comentario = "<";
            if(codigo.charAt(pos) == '*'){
                comentario += '*';
                pos++;
                if(codigo.charAt(pos) == '>' ){
                    while(codigo.charAt(pos) != 'þ' && codigo.charAt(pos) != 'æ'){
                        pos++;
                    }
                    return { pos, response}
                }
                while((codigo.charAt(pos) != '*' || codigo.charAt(pos + 1) != '>') && codigo.charAt(pos) != 'æ'){
                    if(codigo.charAt(pos) == 'þ'){
                        linha : response.linha++;
                    } else {
                        comentario += codigo.charAt(pos);
                    }
                    pos++;
                }
                if(codigo.charAt(pos) == '*' && codigo.charAt(pos + 1) == '>'){
                    pos += 2;
                } else if(codigo.charAt(pos) == 'æ') {
                    response.possuiErro = true;
                    response.erros.push({ id: 1, linha : response.linha , descricao: "Comentário sem simbolo *> de encerramento" });
                }
            } else{
                response.possuiErro = true;
                response.erros.push({ id: 1, linha : response.linha , descricao: "Simbolo < invalido" });
            }
            return { pos, response}
        },
        analisarHash: function(pos , response, codigo){
            pos++;
            var literal = "#";
            while(codigo.charAt(pos) != '#'){
                if(codigo.charAt(pos) == 'æ' || codigo.charAt(pos) == 'þ'){
                    response.possuiErro = true;
                    response.erros.push({ id: 1, linha : response.linha , descricao: "Não foi encontrado o simbilo de fechamento #" });
                    return { pos, response}
                }
                literal += codigo.charAt(pos);
                pos++;
            }
            literal += "#";
            pos++;
            response.quantidadeDeTokens++;
            response.tokens.push({ id: response.quantidadeDeTokens, token: literal, codigo: 11 , linha : response.linha});
            return { pos, response}
        },
        analisarNomeString: function(pos , response, codigo){
            pos++;
            var nomestring = "\"";
            while(codigo.charAt(pos) != "\""){
                if(codigo.charAt(pos) == 'æ' || codigo.charAt(pos) == 'þ'){
                    response.possuiErro = true;
                    response.erros.push({ id: 1, linha : response.linha , descricao: "Não foi encontrado o simbilo de fechamento \"" });
                    return { pos, response}
                }
                nomestring += codigo.charAt(pos);
                pos++;
            }
            pos++;
            nomestring += "\"";
            response.quantidadeDeTokens++;
            response.tokens.push({ id: response.quantidadeDeTokens, token: nomestring, codigo: 9 , linha : response.linha});
            return { pos, response}
        },
        analisarPlus: function(pos , response, codigo){
            pos++;
            var token = "+";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '+'){
                token += "+";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 33 , linha : response.linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 34 , linha : response.linha});
            return { pos, response}
        },
        analisarMinus : function(pos , response, codigo){
            pos++;
            var token = "-";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '-'){
                token += "-";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 46 , linha : response.linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 47 , linha : response.linha});
            return { pos, response}
        },

        analisarEqual: function(pos , response, codigo){
            pos++;
            var token = "=";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 28 , linha : response.linha});
                return { pos, response}
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 29 , linha : response.linha});
            return { pos, response}
        },

        analisarMaior: function(pos , response, codigo){
            pos++;
            var token = ">";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '>'){
                token += ">";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 25 , linha : response.linha});
                return { pos, response}
            }else if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 26 , linha : response.linha});
                return { pos, response}
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 27 , linha : response.linha});
            return { pos, response}
        },

        analisarMenor: function(pos , response, codigo){
            pos++;
            var token = "<";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '<'){
                token += "<";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 31 , linha : response.linha});
                return { pos, response}
            }else if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 30 , linha : response.linha});
                return { pos, response}
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 32 , linha : response.linha});
            return { pos, response}
        },

        analisarDiff: function(pos , response, codigo){
            pos++;
            var token = "!";
            if(codigo.charAt(pos) == '='){
                response.quantidadeDeTokens++;
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 45 , linha : response.linha});
                return { pos, response}
            }
            response.possuiErro = true;
            response.erros.push({ id: 1, linha : response.linha , descricao: "Token ! invalido" });
            return { pos, response}
        },
        analisarCharSeq: function(pos , response, codigo){
            var charSeq = "";
            var checker = new RegExp("[a-zA-Z]+");
            while(checker.exec(codigo.charAt(pos))){
                charSeq += codigo.charAt(pos);
                pos++;
            }
            response.quantidadeDeTokens++;
            console.log(charSeq);
            switch(charSeq){
                case 'while' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 1 , linha : response.linha});
                break;

                case 'void' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 2 , linha : response.linha});
                break;

                case 'string' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 3 , linha : response.linha});
                break;

                case 'return' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 4 , linha : response.linha});
                break;

                case 'main' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 10 , linha : response.linha});
                break;

                case 'integer' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 12 , linha : response.linha});
                break;

                case 'inicio' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 13 , linha : response.linha});
                break;

                case 'if' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 14 , linha : response.linha});
                break;

                case 'for' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 16 , linha : response.linha});
                break;

                case 'float' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 17 , linha : response.linha});
                break;

                case 'fim' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 18 , linha : response.linha});
                break;

                case 'else' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 19 , linha : response.linha});
                break;

                case 'do' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 20 , linha : response.linha});
                break;

                case 'cout' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 21 , linha : response.linha});
                break;

                case 'cin' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 22 , linha : response.linha});
                break;

                case 'char' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 23 , linha : response.linha});
                break;

                case 'callfuncao' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 24 , linha : response.linha});
                break;

                default: 

                response.possuiErro = true;
                response.erros.push({ id: 1, linha : response.linha , descricao: "Comando ou identificador invalido" });
                return { pos, response}

                break;
 
            }
            pos--;
            return { pos, response }
        },
    });
}