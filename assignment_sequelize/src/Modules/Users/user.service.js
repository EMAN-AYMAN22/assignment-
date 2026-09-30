import { UserModel } from "../../DB/Models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const checkUser = await UserModel.findOne({ where: { email } });
    if (checkUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await UserModel.create({ name, email, password, role });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const checkUser = await UserModel.findByPk(id);
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await UserModel.update(
      { name, email, password, role },
      { where: { id } },
    );
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["role"] }, // استبعاد حقل الـ role تماماً من النتيجة
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
