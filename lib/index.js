require("dotenv").config();
import express from 'express';
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "@graphql-tools/schema"
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './resolvers';
import context from './config/context';
import cors from 'cors';
import dayjs from 'dayjs';

const { APP_PORT, APP_PORT_DEV, DEV } = process.env;
const app = express();

app.use(cors());

const PORT = DEV == 1 ? APP_PORT_DEV : APP_PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.APP_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const startServer = async () => {

    mongoose.connection.once("open", async () => {
        console.log("Banco conectado");
        console.log(dayjs().format());
        const schema = makeExecutableSchema({
            typeDefs: importSchema(__dirname + "/../schema/index.graphql"),
            resolvers: resolvers
        });
        let opts = graphqlHTTP(async (req, res) => ({
            schema,
            graphiql: DEV == "1" && { headerEditorEnabled: true },
            pretty: DEV == "1",
            context: await context(req)
        }));
        app.get('/', opts);
        app.post('/', opts);
        app.listen(PORT, () => {
            console.log("Rodando porta", PORT);
        });
    });
}

startServer();