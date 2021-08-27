import { getAllPermissoes, getPermissoes, validaPermissao } from "../data/permissoes";
import { UserModel } from '../model/users';
const jwt = require("jwt-simple");
const error = new Error("Não autorizado!");

module.exports = async (req) => {
    const token = req.headers.token;
    const platform = req.headers.platform;
    let usuario = null;
    let payload = null;

    if (token) {
        payload = jwt.decode(token, process.env.APP_TOKEN);
        usuario = await UsuarioModel.findById(payload.id);
    }

    if (platform && usuario) {
        let _platform = await UsuarioModel.findOne({ _id: String(usuario._id), platform });
        if (!_platform) {
            await UsuarioModel.findOneAndUpdate({ _id: String(usuario._id) }, { $push: { platform: platform } });
        }
    }
    return {
        usuario,
        isLogado() {
            if (!usuario) throw error;
        },
    }
};
