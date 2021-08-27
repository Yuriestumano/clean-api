import mongoose from 'mongoose'
import mongooseTimeStamp from 'mongoose-timestamp'
import mongooseStringQuery from 'mongoose-string-query'

const ProfilesSchema = new mongoose.Schema({
  tipo:String,
  permissoes_app:[],
  permissoes_web:[]
})

ProfilesSchema.plugin(mongooseTimeStamp)
ProfilesSchema.plugin(mongooseStringQuery)
export const profileModel = mongoose.model('modelname', ProfilesSchema)