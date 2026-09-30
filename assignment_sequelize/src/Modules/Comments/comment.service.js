import { Op } from "sequelize";
import { CommentModel } from "../../DB/Models/comment.model.js";
import { PostModel } from "../../DB/Models/post.model.js";
import { UserModel } from "../../DB/Models/user.model.js";

export const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const checkPost = await PostModel.findByPk(postId);
    if (!checkPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const checkUser = await UserModel.findByPk(userId);
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const newComment = await CommentModel.create({ content, postId, userId });
    return res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createMultipleComments = async (req, res) => {
  try {
    const { postId, comments } = req.body;
    // [ { userId: 1, content: "Great post!" }, { userId: 2, content: "Very helpful" } ]

    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // edit on the comments array
    const commentsData = comments.map((comment) => ({
      content: comment.content,
      userId: comment.userId,
      postId: postId,
    }));

    // bulkCreate ---> crete bulk of data in one go
    const createdComments = await CommentModel.bulkCreate(commentsData);

    return res.status(201).json({
      message: "Comments created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "you are not the owner of this comment" });
    }
    const comment = await CommentModel.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "you are not the owner of this comment" });
    }
    await comment.update({ content });
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const findOrCreateComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const [comment, created] = await CommentModel.findOrCreate({
      where: { content, postId, userId },
      defaults: { content, postId, userId },
    });
    if (created) {
      return res
        .status(201)
        .json({ message: "Comment created successfully", comment });
    }
    return res.status(200).json({ comment, created });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getCommentsByKeyword = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res
      .status(400)
      .json({ message: "Keyword query parameter is required" });
  }
  try {
    const { count, rows: comments } = await CommentModel.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
    if (count === 0) {
      return res
        .status(404)
        .json({ message: "No comments found matching the keyword" });
    }
    return res.status(200).json({ count, comments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getNewestComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await CommentModel.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    return res.status(200).json({ comments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findByPk(id, {
      attributes: ["id", "content"],
      include: {
        model: UserModel,
        attributes: ["id", "name", "email"],
      },
    });

    if (!comment) {return res.status(404).json({ message: "Comment not found" });}
    
    return res.status(200).json({comment,});

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
