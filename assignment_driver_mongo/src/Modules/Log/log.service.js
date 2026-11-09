import { db } from "../../DB/Connection.js"; // أو من ملف الاتصال لديكِ
import logModel from "../../DB/Models/logModel.js";


export const createLog = async (req, res) => {
    const logData = req.body;
    try {
        const log = await logModel.insertOne(logData)
        res.status(201).json({
            status: "ok:1",
            data: log
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}