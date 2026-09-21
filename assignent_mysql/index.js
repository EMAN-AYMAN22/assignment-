import express from "express";
import { bootstrsb } from "./src/app.controller.js";

const port = Number(process.env.PORT) || 3001;
const app = express();

bootstrsb(app,express)
app.listen(port, () => {
    console.log(`server is running http://127.0.0.1:${port}`);
});