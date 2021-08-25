import bcrypt from 'bcrypt';
import { UsuarioModel, UsuarioStatus } from '../../model/usuarios';
import { geraSessaoUsuario } from '../comum/usuario';

export const UsuarioQuery = {
  async login(_, { email, password }, ctx) {
    try {
      let user = null;
      user = await UsuarioModel.findOne({
        $or: [
          { email },
          { cpf: email }
        ]
      })
      if (!user) throw new Error("Usuário não encontrado!");
      if (!password) throw new Error("É necessário uma senha")
      if (!await bcrypt.compare(password, user.password)) throw new Error("Senha incorreta!");
      let sessao = await geraSessaoUsuario(user);
      return {
        ...user.toJSON(),
        ...sessao
      }
    } catch (error) {
      throw error;
    }
  }
};