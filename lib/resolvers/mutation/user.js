import { UserModel } from "../../model/users"
import jwt from 'jwt-simple'
import bycript from 'bcrypt'
import { errorHandle } from "../../util/errorHandle"
import { Utils } from "../../util"
import { sendEmailHtml } from "../../html"
const { APP_SALT } = process.env
export const UserMutation = {
  async user(_,{ data }, ctx){
    try {
      // await handleNewUser(data)
      let newUser = await formatUser(data)     
      newUser = await new UserModel(newUser).save()
      let payload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
      let token = await jwt.encode(payload, process.env.APP_TOKEN)
      newUser.token = token
      Utils.sendEmail(
        {
          from: 'QuickTrip App', 
          to: newUser.email, 
          subject: "Email de confirmação de cadastro ✔",
          text: "Novo no app?", 
          html: sendEmailHtml.checkEmail(data)
        }
      )
      return newUser
    } catch (error) {
      throw error
    }
  }
}

async function formatUser(newUserData){
  try {
    let { password, email  } = newUserData
    let obj = newUserData
    if(!password) errorHandle( 'É necessário uma senha')
    if(!email) errorHandle('É necessário uma email')
    obj.password = await bycript.hashSync(obj.password, APP_SALT )
    return obj
  } catch (error) {
    throw error
  }
}

async function handleNewUser(newUserData){
  try {
    let user = await UserModel.findOne({$or:[{email: newUserData.email}]} )
    if(user) errorHandle('Usuário já cadastrado')
  } catch (error) {
    throw error
  }
}

