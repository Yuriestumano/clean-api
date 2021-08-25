import { getPermissoes } from '../../data/permissoes';
import jwt from 'jwt-simple';

export const geraSessaoUsuario = async usuario => {
    try {
        const agora = Math.floor(Date.now() / 1000);
        const payload = {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            iat: agora,
            // exp: agora + 1 * 24 * 60 * 60
        };

        if (usuario.empresa && usuario.empresa.perfil && usuario.empresa.perfil._id) {
            let perfil = await PerfilModel.findById(usuario.empresa.perfil._id).select("permissoes");
            usuario.empresa.perfil.permissoes = getPermissoes(perfil.permissoes);
        }
        const token = jwt.encode(payload, process.env.APP_TOKEN);
        return {
            ...payload,
            token
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

