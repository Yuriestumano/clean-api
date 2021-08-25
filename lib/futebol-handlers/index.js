import { FutebolCampeonatoModel } from '../model/futebol-campeonato';
import { FutebolEventoModel } from '../model/futebol-evento';
import { FutebolCotacaoModel } from '../model/futebol-cotacao';
import { FutebolCotacaoSiglaModel } from '../model/futebol-cotacao-sigla';
import dayjs from 'dayjs';

const HandleErrorsSync = {
    "campeonato-error": {
        type: "BODY ERROR REQUEST",
        message: "ID do campeonato não existe na requisiçõa."
    }
}

const sleep = (timer) => new Promise((resolve) => setTimeout(() => resolve(true), timer));

const FutebolHandlers = {
    recebeEvento: async (req, res, next) => {
        try {
            let initSync = dayjs();
            let now = dayjs().toDate();
            let { resultado, status, apurado, esporte, apurando, hora_ajustada, base, campeonato, data_hora, data, idBetRadar, cotacoes, id_base, casa, fora } = req.body;
            // Adicionar/Editar Campeonato;
            if (!campeonato?._id || !campeonato?.descricao) throw HandleErrorsSync['campeonato-error'];
            let __campeonato = {
                _id: campeonato._id,
                descricao: campeonato.descricao.toUpperCase(),
                esporte: 1,
                last_sync: now
            }
            await FutebolCampeonatoModel.updateOne(
                { _id: campeonato?._id },
                { $set: { ...__campeonato } },
                { upsert: true, new: true }
            )
            console.log("Campeonato syncronizado!");
            // Adiconar/Editar Sigla;
            let siglasPromises = [];
            for (let i of cotacoes) {
                siglasPromises.push(
                    FutebolCotacaoSiglaModel.updateOne(
                        { id: i.id },
                        { $set: { sigla: i?.sigla, last_sync: now } },
                        { upsert: true, new: true }
                    )
                )
            }
            await Promise.all(siglasPromises);
            console.log("Siglas syncronizadas!");
            // Adicionar/Editar Evento;
            let futebolEvento = await FutebolEventoModel.findOneAndUpdate(
                { id_base, status: 0 },
                {
                    $set: {
                        id_base,
                        resultado,
                        status,
                        apurado,
                        esporte,
                        apurado,
                        hora_ajustada,
                        base,
                        campeonato: __campeonato,
                        data_hora,
                        data,
                        idBetRadar,
                        casa,
                        fora,
                        last_sync: now
                    }
                },
                { upsert: true, new: true }
            )
            console.log("Evento sync!");
            // Adicionar/Editar Cotacoes;
            let promisesCotacoes = [];
            if (futebolEvento?._id && futebolEvento?.status == 0) {
                let evento_id = futebolEvento._id
                for (let i of cotacoes) {
                    if (i?._id) {
                        promisesCotacoes.push(
                            FutebolCotacaoModel.updateOne(
                                { _id: i._id },
                                { $set: { ...i, evento_id, last_sync: now } },
                                { upsert: true, new: true }
                            )
                        )
                    }
                }
            }
            await Promise.all(promisesCotacoes);
            // await sleep(3000);
            let timeDiff = dayjs().diff(initSync, "second");
            console.log("Finished in %s seconds", timeDiff);
            res.json(true);
        } catch (error) {
            if (error?.type) {
                console.log(":::::Handled error on request", error)
            } else {
                console.log(":::::Not Handled error on function", error);
            }
            res.status(400);
            res.json("Error");
        }
    }
}

export default FutebolHandlers