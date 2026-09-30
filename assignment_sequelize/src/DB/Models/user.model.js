import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const UserModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,

        checkLengthName(value) {
          if (value < 2)
            throw new Error("the Name must be greater than 2 characters");
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "Please enter a valid email address", // رسالة خطأ لو الصيغة مش صحيحة
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: {
          args: [6, 100], 
          msg: "Password must be between 6 and 100 characters",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  { timestamps: true, paranoid: true },
);
