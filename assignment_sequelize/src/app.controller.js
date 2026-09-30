import { asyncTables, testConnection } from "./DB/connection.js";
import { commentRouter, postRouter, userRouter } from "./Modules/index.js";
import { UserModel } from "./DB/Models/user.model.js";
import { PostModel } from "./DB/Models/post.model.js";
import { CommentModel } from "./DB/Models/comment.model.js"; 

export const bootstrap = async (app, express) => {
  app.use(express.json());

  testConnection();
  asyncTables();
 
  app.get("/", (req, res) => {
    res.status(200).json({ message: "welcom Api" });
  });

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/comments", commentRouter);

  app.all("/*dumy", (req, res) => {
    return res.status(404).json({ message: "Not found handler!!" });
  });
};
