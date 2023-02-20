import express from "express";
import { configViewEngine } from "./config/viewEngine";
import { initWebRouter } from "./route/web";
import { initApiRouter } from "./route/api";
import { connDB } from "./config/connDB";
import cors from 'cors';
require("dotenv").config;
let app = express();

////////     Middleware CORS    ////////
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
////////////      End Middleware CORS      ////////////
app.use(cors({ origin: true }));
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));


configViewEngine(app);
initWebRouter(app);
initApiRouter(app);
connDB();
let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running port= ${port}`);
})