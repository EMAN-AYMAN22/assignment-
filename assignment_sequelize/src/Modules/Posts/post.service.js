import { CommentModel } from "../../DB/Models/comment.model.js";
import { PostModel } from "../../DB/Models/post.model.js";
import { UserModel } from "../../DB/Models/user.model.js";

export const createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const userExists = await UserModel.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new PostModel({ title, content, userId });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Assuming userId is sent in the request body for authorization
  try {
    const userExists = await UserModel.findByPk(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ message: "User not authorized to delete this post" });
    }
    const post = await PostModel.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getPostsDetails = async (req, res) => {
  try {
    const posts = await PostModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: UserModel,
          // 2. تحديد الحقول المطلوبة فقط لليوزر (id, name)
          attributes: ["id", "name"],
        },
        {
          model: CommentModel,
          // 3. تحديد الحقول المطلوبة فقط للكومنتس (id, content)
          attributes: ["id", "content"],
        },
      ],
    });
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts=await PostModel.findAll({
        attributes:["id", "title"],
    })
    const result = await Promise.all(
      posts.map(async (post) => {
        const count = await post.countComments(); // دالة جاهزة من سيلايز بتعد الكومنتات للبوست ده
        return {
          id: post.id,
          title: post.title,
          commentCount: count
        };
      })
    );
    res.status(200).json({ posts: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
