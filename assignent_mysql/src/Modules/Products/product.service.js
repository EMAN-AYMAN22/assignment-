import { connection } from "../../DB/connection.js";


export const getAllProducts= async (req, res) => {
  try {
    const [result] = await connection.execute("SELECT * FROM products");
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}
export const getProduct =async (req, res) => {
  const { id } = req.params;
  const getquery = `SELECT * FROM products WHERE id =?`;
  try {
    const [result] = await connection.execute(getquery, [id]);
    if (result.length === 0)
      return res.status(404).json({ message: "Not found the product" });
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}
export const updateProduct =async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const updateQuery = `UPDATE products SET name = ?, price = ? WHERE id = ?`;

  try {
    const [result] = await connection.execute(updateQuery, [name, price, id]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or no changes made" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    // (Unique name Constraint)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Product name already exists" });
    }

    return res.status(500).json({ message: "Error", error: error.message });
  }
}
export const createProduct = async (req, res) => {
  const { name, price, stock_quantity, supplier_id } = req.body;

  const insertQuery = `INSERT INTO products (name, price, stock_quantity, supplier_id) VALUES (?, ?, ?, ?)`;

  try {
    const [result] = await connection.execute(insertQuery, [
      name,
      price,
      stock_quantity,
      supplier_id,
    ]);

    return res.status(201).json({
      message: "Product added successfully!",
      insertedId: result.insertId,
    });
  } catch (error) {
    //UNIQUE constraint)
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Product already exists in database" });
    }

    // 3. خطأ عدم وجود المورد (Foreign Key constraint constraint error)
    if (error.code === "ER_NO_REFERENCED_ROW_2" || error.errno === 1452) {
      return res.status(404).json({ message: "Supplier ID does not exist" });
    }

    return res.status(500).json({ message: "Error", error: error.message });
  }
}
export const deleteProduct =async (req, res) => {
  const { id } = req.params;
  const delQuery = `DELETE FROM products  WHERE id=?`;
  try {
    const [result] = await connection.execute(delQuery, [id]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "Product not found or already deleted" });
    return res.status(200).json({ message: "Product delete successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}
