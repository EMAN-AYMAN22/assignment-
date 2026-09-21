import { connection } from "../../DB/connection.js"

export const getAllSuppliers=async(req,res)=>{
    const getQuery=`SELECT * FROM suppliers`
  try {
    const [result]= await connection.execute(getQuery)
    return res.status(200).json({result})
  } catch (error) {
    return res.status(500).json({error})
  }
}

export const createSupplier=async(req,res)=>{
const {name,contact_number}=req.body
const insertQuery=`INSERT INTO suppliers( name, contact_number) VALUES (?,?)`
try {
  const[result]= await connection.execute(insertQuery,[name,contact_number])
        return res.status(200).json({message:"suppliers add successfulli!"})

} catch (error) {
  // console.log(error);
  if(error.code === "ER_DUP_ENTRY"){
     return res.status(409).json({message:"Supplier already exists"})
  }
  return res.status(500).json({error})
  
  
}

}

export const updateSuppliers=async (req,res)=>{
  const{id}=req.params
  const {name,contact_number}=req.body
  const updateQuery=`UPDATE suppliers SET name = ?, contact_number = ? WHERE id = ?`
  try {
    const[result]= await connection.execute(updateQuery,[name,contact_number,id])
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "suppliers not found or no changes made" });
    }
    return res.status(200).json({ message: "supplier updated successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "supplier name already exists" });
    }

    return res.status(500).json({ message: "Error", error: error.message });
  }

} 

export const deleteSupplier=async (req, res) => {
  const { id } = req.params;
  const delQuery = `DELETE FROM suppliers WHERE id = ?`;

  try {
    const [result] = await connection.execute(delQuery, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}


