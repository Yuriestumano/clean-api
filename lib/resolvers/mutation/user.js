import { UserModel } from "../../model/users"
import jwt from 'jwt-simple'
import bycript from 'bcrypt'

export const UserMutation = {
  test(){
    console.log('teste')
  },
  async user(_,{ data }, ctx){
    try {
      console.log(' aque')
      await handleNewUser(data)
      let newUser = await formatUser(data)     
      console.log(newUser,' aque')
      newUser = await new UserModel(newUser).save()
      let payload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
      let token = await jwt.encode(payload, process.env.APP_TOKEN)
      return true
    } catch (error) {
      throw error
    }
  }
}

async function formatUser(newUserData){
  try {
    let { password, email  } = newUserData
    let obj = newUserData
    if(!password) throw 'É necessário uma senha'
    if(!email) throw 'É necessário uma email'
    obj.password = await bycript.hashSync(obj.password, process.env.SALT )
    return obj
  } catch (error) {
    throw error
  }
}

async function handleNewUser(newUserData){
  try {
    let user = await UserModel.findOne({$or:[{email: newUserData.email}]} )
    if(user) throw 'Usuário já cadastrado'
  } catch (error) {
    throw error
  }
}
