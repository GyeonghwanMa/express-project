const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = process.env;
if (!MONGO_URI) throw new Error("MONGO_URI is required!!!");
if (!PORT) throw new Error("PORT is required!!!");

const server = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // json을 자바스크립트로 변경
        app.use(express.json());

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        
        app.listen(PORT, async () => {
            console.log(`server listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
server();