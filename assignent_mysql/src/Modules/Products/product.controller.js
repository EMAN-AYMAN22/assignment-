import { Router } from "express";  
import * as productService from "./product.service.js"
const router=Router()

//http://127.0.0.1:3001/api/v1/products 

router.get("/", productService.getAllProducts); 
router.get("/:id", productService.getProduct);
router.post("/create", productService.createProduct);
router.patch("/:id", productService.updateProduct);
router.delete("/:id", productService.deleteProduct); 

export default router;