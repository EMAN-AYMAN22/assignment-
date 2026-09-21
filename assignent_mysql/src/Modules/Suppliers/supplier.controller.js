
import { Router } from "express";
import * as supplierService from "./supplier.service.js"
const router=Router()


//get all suppliers
router.get("/",supplierService.getAllSuppliers)
//create suppliers
router.post("/",supplierService.createSupplier)
//update suppliers
router.patch("/:id",supplierService.updateSuppliers)
//delete suppliers
router.delete("/:id",supplierService.deleteSupplier ); 



export default router;  