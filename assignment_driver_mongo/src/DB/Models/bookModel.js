import { db } from "../Connection.js";

const bookSchema = {
  bsonType: "object",
  required: ["title"],
  properties: {
    title: {
      bsonType: "string",
      minLength: 3,
      maxLength: 100,
      description: "must be a string containing at least 3 characters and is required"
    }
  }
};

export const BookModel=await db.createCollection("books", {
  validator: {
    $jsonSchema: bookSchema
  }
});