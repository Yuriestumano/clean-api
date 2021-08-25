import bcrypt from 'bcrypt';
import { UsuarioModel, UsuarioStatus } from '../../model/usuarios';
import { Utils } from '../../util';
import { geraSessaoUsuario } from '../comum/usuario';

export const UsuarioQuery = {
  async login(_, { value, senha }, ctx) {
    try {
      value = value.trim()
      let usuario = null;
      usuario = await UsuarioModel.findOne({
        $or: [
          { cod: value },
          { username: value }
        ]
      })
      if (usuario.status == UsuarioStatus.INATIVO) throw new Error("Usuário se encontra inativo");
      if (!usuario) throw new Error("Usuário não encontrado!");
      if (!senha) throw new Error("É necessário uma senha")
      if (!await bcrypt.compare(senha, usuario.senha)) throw new Error("Senha incorreta!");
      let sessao = await geraSessaoUsuario(usuario);
      return {
        ...usuario.toJSON(),
        ...sessao
      }
    } catch (error) {
      throw error;
    }
  },
  testeEmail(_, { }, ctx) {
    try {
      Utils.sendEmail({
        to: "giovane.yuri1@gmail.com",
        from: "Teste do from",
        subject: "Teste de email",
        html: `
          <p>Usuario criado com sucesso, seu token é: teste 1243</p>
          `
      })
    } catch (error) {
      
    }
  }
};