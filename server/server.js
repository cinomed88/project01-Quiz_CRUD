'use strict';
import express from "express";
import router from "./router";
import cors from "cors";
import history from "connect-history-api-fallback";

const app = express();
const port = process.env.PORT || 3001;
const endPointRoot = "/projects/01/API/v2/questions";

const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(history());

app.use(endPointRoot, router);

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
