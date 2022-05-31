import express from "express";
import config from "config";
import log from "./logger";
import cors from "cors";
import db from './models';
import router from "./routes";
import {deserializeUser} from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());
app.use(deserializeUser);
app.use(router);

db.sequelize.sync({
    alter:true
}).then(() => {
    app.listen(port, host, () => {
        log.info(`Server listing at http://${host}:${port}`);
    });
}).catch(()=>{
    log.error("Something went wrong");
})