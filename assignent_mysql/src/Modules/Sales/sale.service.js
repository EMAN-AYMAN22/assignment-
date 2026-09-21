import { connection } from "../../DB/connection.js";


export const getSales=async(req,res)=>{
    const getQuery=`SELECT * FROM sales`
    try {
        const [result]= await connection.execute(getQuery)
         return res.status(200).json({result})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({error})
    }
}
export const createSale=async (req, res) => {
  const {  quantity_sold, date,product_id } = req.body;

  const insertQuery = `INSERT INTO sales (quantity_sold, date,product_id) VALUES (?, ?, ?)`;

  try {
    const [result] = await connection.execute(insertQuery, [quantity_sold,date,product_id]);

    return res.status(201).json({
      message: "Sale created successfully!",
      saleId: result.insertId
    });
  } catch (error) {
    // 3. التعامل مع خطأ عدم وجود المنتج في قاعدة البيانات (Foreign Key Constraint)
    if (error.code === "ER_NO_REFERENCED_ROW_2" || error.errno === 1452) {
      return res.status(404).json({ message: "Product ID does not exist" });
    }

    console.log(error);
    return res.status(500).json({ message: "Error", error: error.message });
  }
}
export const getSalesByProductID=async (req, res) => {
  const { productId } = req.params;
  
  // كويري بسيط جداً يجلب كل مبيعات المنتج المحدد
  const getQuery = `SELECT * FROM sales WHERE product_id = ?`;

  try {
    const [result] = await connection.execute(getQuery, [productId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No sales found for this product" });
    }

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}