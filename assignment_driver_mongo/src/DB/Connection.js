import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);
export const db = client.db(process.env.DB_NAME);

const connectionDB = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to server DB");
  } catch (error) {
    console.log("Error when connect", error);
  }
};

export default connectionDB;