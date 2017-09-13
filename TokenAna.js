module.exports = () => { return ({
        analisarIdentificador: function(pos , response, codigo, linha){
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
        },
        analisarPlus: function(pos , response, codigo, linha){
            pos++;
            var token = "+";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '+'){
                token += "+";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 33 , linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 34 , linha});
            return { pos, response }
        },
        analisarMinus : function(pos , response, codigo, linha){
            pos++;
            var token = "-";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '-'){
                token += "-";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 46 , linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 47 , linha});
            return { pos, response }
        },

        analisarEqual: function(pos , response, codigo, linha){
            pos++;
            var token = "=";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 28 , linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 29 , linha});
            return { pos, response }
        },

        analisarMaior: function(pos , response, codigo, linha){
            pos++;
            var token = ">";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '>'){
                token += ">";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 25 , linha});
                return { pos, response }
            }else if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 26 , linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 27 , linha});
            return { pos, response }
        },

        analisarMenor: function(pos , response, codigo, linha){
            pos++;
            var token = "<";
            response.quantidadeDeTokens++;
            if(codigo.charAt(pos) == '<'){
                token += "<";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 31 , linha});
                return { pos, response }
            }else if(codigo.charAt(pos) == '='){
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 30 , linha});
                return { pos, response }
            }
            response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 32 , linha});
            return { pos, response }
        },

        analisarDiff: function(pos , response, codigo, linha){
            pos++;
            var token = "!";
            if(codigo.charAt(pos) == '='){
                response.quantidadeDeTokens++;
                token += "=";
                pos++;
                response.tokens.push({ id: response.quantidadeDeTokens, token , codigo: 45 , linha});
                return { pos, response }
            }
            response.possuiErro = true;
            response.erros.push({ id: 1, linha , descricao: "Token ! invalido" });
            return { pos, response }
        },
        analisarCharSeq: function(pos , response, codigo, linha){
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
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 1 , linha});
                break;

                case 'void' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 2 , linha});
                break;

                case 'string' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 3 , linha});
                break;

                case 'return' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 4 , linha});
                break;

                case 'main' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 10 , linha});
                break;

                case 'integer' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 12 , linha});
                break;

                case 'inicio' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 13 , linha});
                break;

                case 'if' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 14 , linha});
                break;

                case 'for' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 16 , linha});
                break;

                case 'float' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 17 , linha});
                break;

                case 'fim' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 18 , linha});
                break;

                case 'else' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 19 , linha});
                break;

                case 'do' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 20 , linha});
                break;

                case 'cout' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 21 , linha});
                break;

                case 'cin' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 22 , linha});
                break;

                case 'char' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 23 , linha});
                break;

                case 'callfuncao' :
                response.tokens.push({ id: response.quantidadeDeTokens, token: charSeq, codigo: 24 , linha});
                break;

                default: 

                response.possuiErro = true;
                response.erros.push({ id: 1, linha , descricao: "Comando ou identificador invalido" });
                return { pos, response };

                break;
 
            }
            pos--;
            return { pos, response };
        },
    });
}