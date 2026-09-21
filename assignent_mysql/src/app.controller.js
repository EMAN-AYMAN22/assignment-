import { connectionFn } from "./DB/connection.js";
import {  productRouter, salesRouter, supplierRouter } from "./Modules/index.js"; // إضافة .js
export const bootstrsb =(app,express)=>{

    app.use(express.json());

// مسح كلمة await
connectionFn();
app.use("/api/v1/products", productRouter);
app.use("/api/v1/suppliers",supplierRouter)
app.use("/api/v1/sales",salesRouter)


app.all("/*dumy",(req,res)=>{ 
    return res.status(500).json({message:"Not found this Handler!!!"})
    
})
}