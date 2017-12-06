const M = function(X,a){
    var tabParsing = new Array(77);
    for (var i = 0; i <= 77; i++) {
        tabParsing[i] = new Array(48);
    }
    tabParsing[48][2] = [2,10,36,49,50,51,35];
    tabParsing[49][2] = [15];
    tabParsing[49][3] = [15];
    tabParsing[49][7] = [100, 7, 52, 38, 100.1, 53, 37, 54];
    tabParsing[49][12] = [15];
    tabParsing[49][13] = [15];
    tabParsing[49][17] = [15];
    tabParsing[49][23] = [15];
    tabParsing[49][44] = [15];
    tabParsing[50][2] = [101.1, 56,101,7,57,36,49,50,51,4,43,106,105,58,42,35,50];
    tabParsing[50][3] = [101.1, 56,101,7,57,36,49,50,51,4,43,106,105,58,42,35,50];
    tabParsing[50][12] = [101.1, 56,101,7,57,36,49,50,51,4,43,106,105,58,42,35,50];
    tabParsing[50][13] = [15];
    tabParsing[50][17] = [101.1, 56,101, 102, 7,57,36,49,50,51,4,43,106,105,58,42,35,50]; //declaracao de funcao
    tabParsing[50][23] = [101.1, 56,101,7,57,36,49,50,51,4,43,106,105,58,42,35,50]; 
    tabParsing[51][13] = [13,61,37,62,18];
    tabParsing[52][38] = [15];
    tabParsing[52][40] = [40, 100, 7,52]; //Repeticao de declaracao de
    tabParsing[53][3] = [3];
    tabParsing[53][12] = [12];
    tabParsing[53][17] = [17];
    tabParsing[53][23] = [23];
    tabParsing[54][2] = [15];
    tabParsing[54][3] = [15];
    tabParsing[54][7] = [100, 55,38, 100.1, 53,37,54];
    tabParsing[54][12] = [15];
    tabParsing[54][13] = [15];
    tabParsing[54][17] = [15];
    tabParsing[54][23] = [15];
    tabParsing[54][44] = [15];
    tabParsing[55][7] = [7,52];
    tabParsing[56][2] = [2];
    tabParsing[56][3] = [3];
    tabParsing[56][12] = [12];
    tabParsing[56][17] = [17];
    tabParsing[56][23] = [23];
    tabParsing[57][36] = [15];
    tabParsing[57][43] = [43,59,42];
    tabParsing[58][5] = [5];
    tabParsing[58][6] = [6];
    tabParsing[58][7] = [7];
    tabParsing[58][8] = [8];
    tabParsing[58][9] = [9];
    tabParsing[58][42] = [15];
    tabParsing[59][3] = [53,60];
    tabParsing[59][12] = [53,60];
    tabParsing[59][17] = [53,60];
    tabParsing[59][23] = [53,60];
    tabParsing[60][37] = [37,53,60];
    tabParsing[60][42] = [15];
    tabParsing[61][1] = [103, 106,1,43, 101, 7,67,42,36,61,37,62,35];
    tabParsing[61][5] = [103, 106,63,29,63];
    tabParsing[61][6] = [103, 106,63,29,63];
    tabParsing[61][7] = [103, 106,63,29,63];
    tabParsing[61][8] = [103, 106,63,29,63];
    tabParsing[61][9] = [103, 106,63,29,63];
    tabParsing[61][14] = [103, 106,14, 43, 7,67,42,36,61,37,62,35,68];
    tabParsing[61][16] = [16,43, 7,29,69,37, 101 , 7,67,37,70,42,36,61,37,62,35];
    tabParsing[61][20] = [20,36,61,37,62,35,1,43, 101, 7,67,42];
    tabParsing[61][21] = [21,31,11,71];
    tabParsing[61][22] = [22,25,7];
    tabParsing[61][24] = [24, 107, 7,64];
    tabParsing[61][37] = [15];
    tabParsing[61][43] = [63,29,63];
    tabParsing[62][18] = [15];
    tabParsing[62][35] = [61,37,62];
    tabParsing[63][5] = [73,74];
    tabParsing[63][6] = [73,74];
    tabParsing[63][7] = [73,74];
    tabParsing[63][8] = [73,74];
    tabParsing[63][9] = [73,74];
    tabParsing[63][24] = [24, 107, 7,64];
    tabParsing[63][43] = [73,74];
    tabParsing[64][29] = [15];
    tabParsing[64][37] = [15];
    tabParsing[64][42] = [15];
    tabParsing[64][43] = [43,65,66,42];
    tabParsing[65][5] = [5];
    tabParsing[65][6] = [6];
    tabParsing[65][7] = [7];
    tabParsing[65][8] = [8];
    tabParsing[65][9] = [9];
    tabParsing[66][40] = [40,65,66];
    tabParsing[66][42] = [15];
    tabParsing[67][26] = [26,69];
    tabParsing[67][27] = [27,69];
    tabParsing[67][28] = [27,69];
    tabParsing[67][30] = [30,69];
    tabParsing[67][32] = [32,69];
    tabParsing[67][45] = [45,69];
    tabParsing[68][19] = [19,36,61,37,62,35];
    tabParsing[68][37] = [15];
    tabParsing[69][5] = [5];
    tabParsing[69][6] = [6];
    tabParsing[69][7] = [7];
    tabParsing[69][8] = [8];
    tabParsing[69][9] = [9];
    tabParsing[70][33] = [33,5];
    tabParsing[70][46] = [46,5];
    tabParsing[71][31] = [31,11,71];
    tabParsing[71][37] = [15];
    tabParsing[72][31] = [15];
    tabParsing[72][37] = [15];
    tabParsing[72][40] = [40, 7,72];
    tabParsing[73][5] = [ 75, 76];
    tabParsing[73][6] = [75,76];
    tabParsing[73][7] = [75,76];
    tabParsing[73][8] = [75,76];
    tabParsing[73][9] = [75,76];
    tabParsing[73][43] = [75,76];
    tabParsing[74][29] = [15];
    tabParsing[74][34] = [34,73,74];
    tabParsing[74][37] = [15];
    tabParsing[74][42] = [15];
    tabParsing[74][47] = [47,73,74];
    tabParsing[75][5] = [5];
    tabParsing[75][6] = [6];
    tabParsing[75][7] = [7]; //variaveis de comando
    tabParsing[75][8] = [8];
    tabParsing[75][9] = [9];
    tabParsing[75][43] = [43,63,42];
    tabParsing[76][29] = [15];
    tabParsing[76][34] = [15];
    tabParsing[76][37] = [15];
    tabParsing[76][39] = [39,75,76];
    tabParsing[76][41] = [41,75,76];
    tabParsing[76][42] = [15];
    tabParsing[76][47] = [15];
    if(tabParsing[X]){
        if(tabParsing[X][a]){
            return tabParsing[X][a];
        } else{
            return null;
        }
    } else {
        return null;
    }
}

function envia_analise(response, pilha, X, a){
    response.sintatico.quantidadeDePilhas ++;
    var texto = "";
    var pilha = JSON.parse(JSON.stringify(pilha)).forEach(function(element) {
        texto += element + ","
    });
    var obj = { id : response.sintatico.quantidadeDePilhas , pilha : texto, oX: X, oa: "" + a.token + "("+ a.codigo +")" };
    response.sintatico.listaPilhaDeAnalise.push(obj);
}

function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

module.exports = () => { return ({

    analisar_sintatico: (response) => {


        var tabelaDeControle = {
            variaveis: [],
            funcoes: [],
            funcaoSendoDeclarada: {}
        }

        console.log("Inicio da analise sintatica")
        var lista = JSON.parse(JSON.stringify(response.tokens));
        pilha = [];
        pilha.push(44);
        pilha.push(48);
        const tamLista = lista.length;
        var voltaparapilha = false;
        for(var it = 0; it < tamLista; it++){
            var X = pilha[pilha.length - 1];
            var a = lista[it];
            do {
                envia_analise(response, pilha, X, a)
                if( X == 15){
                    pilha.pop();
                    X = pilha[pilha.length - 1];
                } else {
                    //Verifica se o codigo é uma analise semantica
                    if(X > 99){
                        if(X == 100){
                            if(tabelaDeControle.variaveis.findIndex((value)=>{
                              return value.nome == a.token;
                            }) == -1){
                                tabelaDeControle.variaveis.push({ nome: a.token, tipo: null});
                            } else {
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Variavel " + a.token +
                                " já foi declarada" });
                                return response;
                            }
                        }
                        else if (X == 100.1){
                            tabelaDeControle.variaveis.forEach((variavel)=>{
                                if(variavel.tipo == null){
                                    variavel.tipo = a.token;
                                }
                            })
                        }
                        else if(X == 101.1){
                            tabelaDeControle.funcaoSendoDeclarada = { nome: null, tipo: a.token }
                        }
                        else if(X == 101){
                            if(tabelaDeControle.funcoes.findIndex((value)=>{
                                return value.nome == a.token;
                              }) == -1){
                                tabelaDeControle.funcoes.push({ nome: a.token, tipo: tabelaDeControle.funcaoSendoDeclarada.tipo});
                                tabelaDeControle.funcaoSendoDeclarada.nome = a.token;
                            } else {
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Funcao " + a.token +
                                " já foi declarada" });
                                return response;
                            }
                        }
                        else if(X == 102){
                            if(tabelaDeControle.variaveis.findIndex((value)=>{
                                return value.nome == a.token;
                              }) == -1){
                            } else {
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Já existe uma variavel declarada"
                                + " com o nome " + a.token +" a qual está tentando utilizar para declarar uma função" });
                                return response;
                            }
                        }
                        else if(X == 103){
                            if(tabelaDeControle.funcoes.findIndex((value)=>{
                                return value.nome == a.token;
                              }) == -1){
                            } else {
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Está sendo atribuido valor a "
                                + "uma funcao ( " + a.token + " )" });
                                return response;
                            }
                        }
                        else if(X == 105){
                            var index = tabelaDeControle.variaveis.findIndex((value)=>{
                                return value.nome == a.token;
                            });
                            if(tabelaDeControle.funcaoSendoDeclarada.tipo != tabelaDeControle.variaveis[index].tipo ){
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: O retorna para a funcao " 
                                + tabelaDeControle.funcaoSendoDeclarada.nome + " que deveria ser do tipo " + tabelaDeControle.funcaoSendoDeclarada.tipo
                                + " está recebendo o tipo " + tabelaDeControle.variaveis[index].tipo});
                                return response;
                            }
                            tabelaDeControle.funcaoSendoDeclarada = {}
                        }
                        else if (X == 106){
                            if(tabelaDeControle.variaveis.findIndex((value)=>{
                                return value.nome == a.token;
                            }) == -1){
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Variavel " + a.token +
                                " não foi declarada" });
                                return response;
                            }
                        }
                        else if (X == 107){
                            if(tabelaDeControle.funcoes.findIndex((value)=>{
                                return value.nome == a.token;
                            }) == -1){
                                response.sintatico.possuiErro = true;
                                response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Semantico: Funcao " + a.token +
                                " não foi declarada" });
                                return response;
                            }
                        }
                        pilha.pop();
                        X = pilha[pilha.length - 1];
                    } else if(X < 48 ){
                        if(X == a.codigo){
                            pilha.pop();
                            voltaparapilha = true;
                        } else {
                            response.sintatico.possuiErro = true;
                            response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Sintatico no token " + a.token });
                            return response;
                        }
                    } else {
                        if(M(X,a.codigo) != null){
                            pilha.pop();
                            var itens = M(X,a.codigo).reverse();
                            pilha = pilha.concat(itens);
                            X = pilha[pilha.length - 1];
                            voltaparapilha = false;
                        } else {
                            response.sintatico.possuiErro = true;
                            response.erros.push({ id: 1, linha : a.linha , descricao: "Erro Sintatico no token " + a.token  });
                            return response;
                        }

                    }
                }
            } while (X != 44 && voltaparapilha == false);
            if(X == 44){
                console.log("Analisado com sucesso");
            }
            voltaparapilha = false;
        }
        console.log("tabela de controle");
        console.log(tabelaDeControle);
    }
});
}
