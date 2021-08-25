const mongoose = require("mongoose");
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

const ModelSchema = new mongoose.Schema({
    cod: String,
    nome: String,
    username: String,
    senha: String,
});

ModelSchema.plugin(timestamps);
ModelSchema.plugin(mongooseStringQuery);

export const UsuarioModel = mongoose.model("usuarios", ModelSchema);

export const UsuarioStatus = {
    ATIVO: "ATIVO",
    INATIVO: "INATIVO",
};
