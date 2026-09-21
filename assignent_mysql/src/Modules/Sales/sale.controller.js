import { Router } from "express";
import * as salesService from "./sale.service.js"
const router=Router()

//get all sales
router.get("/",salesService.getSales )

// Record / Create a new sale
router.post("/",salesService.createSale);

//get sale by product id
router.get("/:productId",salesService.getSalesByProductID);

export default router