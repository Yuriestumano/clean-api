const mongoose = require("mongoose");
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

const UserSchema = new mongoose.Schema({
  name:String,
  password:String,
  cpf:String,
  email:[String],
  birthdate:String,
  email:String,
  cellphone:[
    String
  ],
  picture:String,
  profile:{
    _id:String,
    _type:String
  },
  addresses:[
    {
      _type: String,
      description: String,
      cep: String,
      adress: String,
      complement: String,
      number: String,
      district: String,
      city: String,
      state: String,
      references: String,
      obs: String,
      lat: Number,
      long: Number,
    }
  ],

});
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

export const UserModel = mongoose.model("usuarios", UserSchema);

export const USER_ACCESS = {
  ADMINISTRADOR: 1,
  USUARIO: 2,
  USUARIO_PROPRIETARIO: 3,
  USUARIO_FINAL: 4,
};
