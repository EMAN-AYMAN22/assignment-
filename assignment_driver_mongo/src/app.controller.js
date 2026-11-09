import connectionDB from "./DB/Connection.js";
import { bookRouter, logRouter} from "./Modules/index.js";
import { authorRouter } from "./Modules/index.js";
export const bootStrap=async (express,app) => {
    app.use(express.json());
    await connectionDB();


        app.use("/api/v1/book",bookRouter)
        app.use("/api/v1/author",authorRouter)
        app.use("/api/v1/logs",logRouter)





     app.all( "/*dummy",(req,res)=>{
        res.status(404).json({
            status:"fail",
            message:`Can't find ${req.originalUrl} on this server!`
        })
    })
}

