import express from "express";
import { bootstrap } from "./app.controller";
import { devConfig } from "./config/env/dev.config";
// import { resolve } from "node:path"
// import { config } from "dotenv"
// config({ path: resolve("./config/.env") })
const app = express();
const port = devConfig.PORT;
bootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});