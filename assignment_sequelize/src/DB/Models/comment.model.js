import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";
import { PostModel } from "./post.model.js";
import { UserModel } from "./user.model.js";

export class CommentModel extends Model {}

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 500000],
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostModel,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  {
    sequelize, // لازم نمرر الـ instance هنا
    modelName: "Comment",
    timestamps: true,
    paranoid: true,
  }
);


PostModel.hasMany(CommentModel, { foreignKey: 'postId', onDelete: "CASCADE", onUpdate: "CASCADE" });
CommentModel.belongsTo(PostModel, { foreignKey: 'postId' });

UserModel.hasMany(CommentModel, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" });
CommentModel.belongsTo(UserModel, { foreignKey: 'userId' });