

const PERMUTACOES = {

    combinacoesDezRep(array = [], size) {
        let resul = [];
        let arraytemp = [];
        let repeticao_dezena = (array, digits, indice = 0) => {
            if (indice == digits) {
                let temparray = [...arraytemp];
                temparray.sort();
                resul.push(temparray.join(";"));
            } else {
                for (let i = 0; i < array.length; i++) {
                    let valida = false;
                    arraytemp[indice] = array[i];
                    repeticao_dezena(array, digits, indice + 1);
                }
            }
        }
        repeticao_dezena(array, size);
        let unicos = new Set(resul);
        return [...unicos];
        // return resul.filter(this.uniqueArray);
    },
    combinacoesDez(array = [], size) {
        let result = [];
        let combination = [];
        let inner = (start, choose_, arr, n) => {
            if (choose_ == 0) {
                let temparray = [...combination];
                temparray.sort();
                result.push(temparray.join(";"));
            } else
                for (let i = start; i <= n - choose_; i++) {
                    combination.push(arr[i]);
                    inner(i + 1, choose_ - 1, arr, n);
                    combination.splice(combination.length - 1, 1);
                }
        }
        let dezenaCombinadas = (myArray = [], choose) => {
            let n = myArray.length;
            inner(0, choose, myArray, n);
            let array_final = [...result];
            result = [];
            combination = [];
            return array_final;
        }
        return dezenaCombinadas(array, size);
    },
    permutacaoComRepeticacao: (dados, n) => {
        function permWithRep(dados, n) {
            let array = dados;
            let rec = ((array, n) => {
                    if (--n < 0) {
                        return [[]];
                    }
                    let ps = [];
                    array.forEach(value => {
                        rec(array, n).forEach(perm => {
                            perm.unshift(value);
                            ps.push(perm);
                        });
                    });
                    return ps;
                }
            );
            return rec(array, n);
        }
        let _dados = Array.isArray(dados) ? dados : dados.split("");
        let words = [];
        for (let i of permWithRep(_dados, n)) words.push(i.join(""))
        let unicos = new Set(words);
        return [...unicos];
    },
    permutacaoSimples: (array = [], tamanho = 4) => {
        if (array.length == 1 || (tamanho !== null && tamanho <= 1)) {
            return array;
        }
        let array_retorno = [];
        for (let key in array) {
            let val = array[key];
            let array_temp = [...array];
            array_temp.splice(key, 1);
            let temp = PERMUTACOES.permutacaoSimples(array_temp, tamanho !== null ? tamanho - 1 : null);
            for (let x = 0; x < temp.length; x++) {
                temp[x] = val + temp[x];
            }
            array_retorno = [...array_retorno, ...temp];
        }
        // let arr = new Set(array_retorno)
        return array_retorno.filter((value, index, self) => self.indexOf(value) === index);
        // permutacaoSimples: (permutation = []) => {
        // var length = permutation.length,
        //     result = [permutation.slice()],
        //     c = new Array(length).fill(0),
        //     i = 1, k, p;

        // while (i < length) {
        //     if (c[i] < i) {
        //         k = i % 2 && c[i];
        //         p = permutation[i];
        //         permutation[i] = permutation[k];
        //         permutation[k] = p;
        //         ++c[i];
        //         i = 1;
        //         result.push(permutation.slice());
        //     } else {
        //         c[i] = 0;
        //         ++i;
        //     }
        // }
        // return result;
    },
    combinacaoSimples(dados, n){
      //dados = [1, 2, 3, 4, ] n = 3 tamanho 
      let qtdCombGeradas = fatoria(n)

      function permWithRep(dados, n) {
          let array = dados;
          let rec = ((array, n) => {
                  if (--n < 0) {
                      return [[]];
                  }
                  let ps = [];
                  array.forEach(value => {
                      rec(array, n).forEach(perm => {
                          perm.unshift(value);
                          ps.push(perm);
                      });
                  });
                  return ps;
              }
          );
          return rec(array, n);
      }

      let _dados = Array.isArray(dados) ? dados : dados.split("");
      let words = [];
      for (let i of permWithRep(_dados, n)) words.push(i.join(""))
      let unicos = new Set(words);
      return [...unicos];
  },
    quadra(inicio, fim) {
        inicio = String(Number(inicio));
        fim = String(Number(fim));
        if (Number(fim) == 0) fim = "000000".substr(inicio.length);
        let inc_ = [1, 10, 100, 1000];
        let inc = 1;
        for (let i = 0; i < 4; i++) {
            if (inicio[inicio.length - (i + 1)] != fim[fim.length - (i + 1)]) {
                inc = inc_[i];
                break;
            }
        }
        if (Number(fim) == 0) fim = inc_[inicio.length - 1] * 10;
        let resul = [];
        inicio = Number(inicio);
        fim = Number(fim);
        while (fim >= inicio) {
            resul.push(("000000" + inicio).substr(-4));
            inicio += inc;
            if (resul.length > 4000)
                break;
        }
        if (resul.length > 4000)
            resul = [];

        return resul;
    }
}

function fatorial(n){
  return !n? 1 : n *fatorial(n-1)
}

function arranjoSimples(n,k){
  if(n<k) throw new Error('N não pode ser menor que K')
  return fatorial(n)/fatorial(n-k)
}

export default PERMUTACOES;