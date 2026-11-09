import { db } from "../Connection.js";

const LogModel = await db.createCollection("logs", {
            capped: true,
            size: 1048576// 1MB بالبايت
        });

export default LogModel;