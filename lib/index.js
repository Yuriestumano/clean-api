require("dotenv").config();
import express from 'express';
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "@graphql-tools/schema"
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './resolvers';
import context from './config/context';
import cors from 'cors';
import bodyParser from 'body-parser';

const { APP_PORT_DEV, DEV, APP_DB_URL_DEV } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || APP_PORT_DEV;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  
const startServer = async () => {
  mongoose.connection.once("open", async () => {
    const schema = makeExecutableSchema({
      typeDefs: importSchema(__dirname + "/../schema/index.graphql"),
      resolvers: resolvers
    });

    graphqlHTTP(async (req, res) => ({
      schema,
      graphiql: DEV == "1" && { headerEditorEnabled: true },
      pretty: DEV == "1",
      context: await context(req)
    }));

    app.listen(PORT, async () => {
      console.log("Rodando porta", PORT);
    });
  });
}

startServer();
