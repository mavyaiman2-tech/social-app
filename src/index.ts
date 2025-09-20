import express from "express";
import {bootstrap} from "./app.controller";
import {config} from "dotenv";
import {devConfig} from "./config/dev.config";
config({path:"./config/dev.config.ts"});
const app = express();
const port = devConfig.PORT;
bootstrap(app,express);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});