import { sequelize } from "../connection.js";
import { DataTypes, Model } from "sequelize";
import { UserModel } from "./user.model.js";

export class PostModel extends Model {}

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 1000],
      },
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
    sequelize,
    modelName: "Post",
    timestamps: true,
    paranoid: true,
  }
);

UserModel.hasMany(PostModel, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
PostModel.belongsTo(UserModel, { foreignKey: "userId" });