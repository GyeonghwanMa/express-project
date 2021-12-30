import express, { json } from 'express';
import { connect } from "mongoose";
import { ApolloServer } from "apollo-server-express";

import { schema } from "./graphql/schema";
const { MONGO_URI, PORT } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is required!!!");
if (!PORT) throw new Error("PORT is required!!!");

const app = express();

const server = async () => {
    try {
        // DB연결
        await connect(MONGO_URI);

        // json을 자바스크립트로 변경
        app.use(json());

        // Hello World!
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        
        // 서버 포트 설정
        app.listen(PORT, async () => {
            console.log(`server listening on port ${PORT}`);
        });

        // 아폴로 서버 설정
        const apolloServer = new ApolloServer({
            schema,
            playground: true,
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
            app,
            path: "/graphql",
        });
        
    } catch (error) {
        console.log(error);
    }
}
server();
