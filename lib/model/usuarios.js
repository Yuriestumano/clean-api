import { ADDRESS, Docs } from "../config/util";

const mongoose = require("mongoose");
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

const ModelSchema = new mongoose.Schema({
  rg: Docs,
  photo: Docs, 
  cpf: String,
  job: String,
  name: String,
  token: String,
  _type: String,
  birth: Date,
  email: String,
  gender: String,
  status: Number,
  password: String,
  phones: [Number],
  address: ADDRESS,
  companies: [
    {
      _id: String,
      name: String,
      offices: {
        _id: String,
        name: String,
        permissions: [Number]
      },
    },
  ],
  maritalStatus: String,
});
ModelSchema.plugin(timestamps);
ModelSchema.plugin(mongooseStringQuery);

export const UsuarioModel = mongoose.model("usuarios", ModelSchema);

export const UsuarioAcesso = {
  ADMINISTRADOR: 1,
  USUARIO: 2,
  USUARIO_PROPRIETARIO: 3,
  USUARIO_FINAL: 4,
};
