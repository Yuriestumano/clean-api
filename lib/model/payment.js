import mongoose from 'mongoose'
import mongooseTimeStamp from 'mongoose-timestamp'
import mongooseStringQuery from 'mongoose-string-query'

const PaymentSchema = new mongoose.Schema({
  cc_hash: String,
  pagarmeClientId: String,
  pessoal: {
    documento: String,
    tipo_documento: String,
    data_nascimento: String,
    contato: String,
    email: String,
  },
  status: {
    type: Number,
    default: 1
  },
  seis_primeiros: String,
  quatro_ultimos: String,
  bandeira: String,
  nome_cartao: String,
  vencimento: String,
  endereco_cobranca: {
    cep: String,
    logradouro: String,
    bairro: String,
    cidade: String,
    estado: String,
    numero_logradouro: String,
    complemento: String,
  },
  usuario: {
    _id: String,
    nome: String
  }
})

PaymentSchema.plugin(mongooseTimeStamp)
PaymentSchema.plugin(mongooseStringQuery)
const Payment = mongoose.model('modelname', Payment)
export default model