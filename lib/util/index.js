import dayjs from "dayjs";
import { PERMISSOES } from '../data/permissoes';
import { PerfilModel } from '../model/perfis'

const isDev = () => {
    return process.env.DEV == 1 ? true : false;
}
class Tabela {
    constructor() {
        this.linhas = [];
    }
    addLinha() {
        this.linhas.push([]);
    }
    addColuna(tamanho = 10, alinha = 0) {
        this.linhas[this.linhas.length - 1].push({ tamanho, alinha, linhas: [] });
    }
    addTextoColuna(index, texto) {
        let coluna = this.linhas[this.linhas.length - 1][index];
        texto = String(texto)
        let linhas = (texto.length > coluna.tamanho ? Util.quebra_frase(texto, coluna.tamanho) : texto)
            .split("\n")
            .map(
                v => Util.alinha(v.trim(), coluna.tamanho, coluna.alinha)
            );
        coluna.linhas = [...coluna.linhas, ...linhas];
    }
    show() {
        let retorno = [];
        for (let linha of this.linhas) {
            let maiorIndex = 0;
            for (let coluna of linha) {
                if (coluna.linhas.length > maiorIndex) maiorIndex = coluna.linhas.length;
            }
            for (let i = 0; i < maiorIndex; i++) {
                let texto = "";
                for (let coluna of linha) {
                    let text = coluna.linhas[i];
                    if (!text) text = Util.geraCaracter(' ', coluna.tamanho);
                    texto += text;
                }
                retorno.push(texto);
            }
        }
        return retorno;
    }
}

export const Util = {
    Tabela: Tabela,
    isDev: () => isDev(),
    premioLabel: (array) => {
        let label = "";
        let ultimo = null;
        array.map(
            (p, i) => {
                let ant = Number(array[i - 1]);
                let prx = Number(array[i + 1]);
                p = Number(p);
                if (!ant) {
                    label += p;
                    return true;
                }
                if (p - 1 == ant && prx != p + 1) {
                    label += "até" + p;
                    return true;
                }
                if (p - 1 == ant && p + 1 == prx) {
                    return true;
                }
                if (prx == p + 1 && ant != p - 1) {
                    label += " e " + p;
                    return true;
                }
                if (prx != p + 1 && ant != p - 1) {
                    label += " e " + p;
                    return true;
                }
                if (!prx && ant != p - 1) {
                    label += " e " + p;
                    return true;
                }
            }
        )
        return label;
    },
    toStartServerDate(date = new Date()) {
        return dayjs(date).startOf('day').add(3, 'h').toDate()
    },
    toEndServerDate(date = new Date()) {
        return dayjs(date).endOf('day').add(3, 'h').toDate()
    },

    dateStartOfDay(date = dayjs().format(), env = process.env['DEV']) {
        let fuso = env == 1 ? -3 : 0;
        let data = dayjs(date).startOf('day').add(fuso, 'hour').toDate()
        // Tá pegando a hora no Brasil como se já estivesse rodando no servidor. npm run dev
        return data;
    },
    dateEndOfDay(date = dayjs().format(), env = process.env['DEV']) {
        let fuso = env == 1 ? -3 : 0;
        let data = dayjs(date).endOf('day').add(fuso, 'hour').toDate()
        return data;
    },
    now(date = dayjs().format(), env = process.env['DEV']) {
        let fuso = env ? -3 : 0;
        return dayjs(date).add(fuso, 'hour').toDate();
    },
    floatToMoney: (text) => {
        if (!text)
            return '0,00';
        let money = Util.moneyBr(Number(text).toFixed(2).split('.').join(''));
        if (Number(text) < 0) return `-${money}`
        return money;
    },
    moneyBr: text => {
        if (!text)
            return '';
        let money = String(Number(Util.somenteNumero(text)));
        if (Number(money) > 9999999999999)
            money = "0";
        if (money.length < 3)
            money = Util.zeroEsquerda(3, money);
        money = money.replace(/([0-9]{2})$/g, ",$1");
        if (money.length > 6)
            money = money.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        return money;
    },
    zeroEsquerda: (zeros, text) => {
        text = text + '';
        let resp = '';
        let size = zeros - text.length;
        for (let i = 0; i < size; i++) {
            resp += '0';
        }
        resp += text;
        return resp;
    },
    quebra_frase(str, maxWidth) {
        str = String(str);
        let newLineStr = "\n";
        let done = false;
        let res = "";
        do {
            let found = false;
            // Inserts new line at first whitespace of the line
            for (let i = maxWidth - 1; i >= 0; i--) {
                if (this.testWhite(str.charAt(i))) {
                    res = res + [str.slice(0, i), newLineStr].join("");
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            // Inserts new line at maxWidth position, the word is too long to wrap
            if (!found) {
                res += [str.slice(0, maxWidth), newLineStr].join("");
                str = str.slice(maxWidth);
            }

            if (str.length < maxWidth) done = true;
        } while (!done);

        return res + str;
    },
    testWhite(x) {
        var white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    },
    getBicho(str) {
        let bichos = {
            1: "AVESTRUZ",
            2: "ÁGUIA",
            3: "BURRO",
            4: "BORBOLETA",
            5: "CACHORRO",
            6: "CABRA",
            7: "CARNEIRO",
            8: "CAMELO",
            9: "COBRA",
            10: "COELHO",
            11: "CAVALO",
            12: "ELEFANTE",
            13: "GALO",
            14: "GATO",
            15: "JACARÉ",
            16: "LEÃO",
            17: "MACACO",
            18: "PORCO",
            19: "PAVÃO",
            20: "PERU",
            21: "TOURO",
            22: "TIGRE",
            23: "URSO",
            24: "VEADO",
            25: "VACA",
        };
        if (str) {
            return bichos[Math.ceil((Number(String(str).substr(-2)) || 100) / 4)]
        }
        return ""
    },
    getGrupo(str) {
        let bichos = {
            1: "AVESTRUZ",
            2: "ÁGUIA",
            3: "BURRO",
            4: "BORBOLETA",
            5: "CACHORRO",
            6: "CABRA",
            7: "CARNEIRO",
            8: "CAMELO",
            9: "COBRA",
            10: "COELHO",
            11: "CAVALO",
            12: "ELEFANTE",
            13: "GALO",
            14: "GATO",
            15: "JACARÉ",
            16: "LEÃO",
            17: "MACACO",
            18: "PORCO",
            19: "PAVÃO",
            20: "PERU",
            21: "TOURO",
            22: "TIGRE",
            23: "URSO",
            24: "VEADO",
            25: "VACA",
        };
        if (str) {
            return Math.ceil((Number(String(str).substr(-2)) || 100) / 4);
        }
        return ""
    },
    somenteNumero(text) {
        if (!text)
            return '';
        let numeros = [];
        '0123456789'.split('')
            .map(value => numeros[value] = true);
        return String(text).split('')
            .filter(
                value => numeros[value]
            ).join('');
    },
    protecaoDeRota: async (ctx, cod) => {
        try {
            if (ctx.usuario.empresa.perfil) {
                let perfil = await PerfilModel.findById(ctx.usuario.empresa.perfil._id)
                let hasPermission = perfil.permissoes.filter(perm_cod => perm_cod == cod)
                if (hasPermission.length == 0) throw new Error('Não possui permissão')
                return hasPermission
            } throw new Error('Permissão não encontrada')
        } catch (error) {
            throw error;
        }
    },
    geraCaracter: (char = '', size = 0) => {
        let retorno = '';
        for (let i = 0; i < size; i++) {
            retorno += char;
        }
        return retorno;
    },
    alinha: (text = '', size = 0, position = 0) => {
        text = String(text)
        text = text.substr(0, size);
        switch (position) {
            case 0:
                return text + Util.geraCaracter(' ', size - text.length);
            case 1:
                let sobra = size - text.length;
                let isAdd = sobra % 2;
                sobra = Math.trunc(sobra / 2);
                return Util.geraCaracter(' ', sobra) + text + Util.geraCaracter(' ', sobra) + (isAdd ? ' ' : '');
            case 2:
                return Util.geraCaracter(' ', size - text.length) + text;
        }
    },
    milharToGrupo: (str) => {
        return Math.ceil((Number(String(str).substr(-2)) || 100) / 4)
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
    uniqueArray: (value, index, self) => {
        return self.indexOf(value) === index;
    },
    AGENTE_FUTEBOL: 'Agente Futebol',
    AGENTE: 'Agente',
    DIGITADOR: 'Digitador',
    ADM_FUTEBOL: 'ADM Futebol'

}       
