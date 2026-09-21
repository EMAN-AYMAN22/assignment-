import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: "./src/Config/.env" });

export const connection = await mysql.createConnection({
  host: process.env.DB_URL, //local host
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

// 2. make sure DB connection
export const connectionFn = async () => {
  try {
    await connection.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};
