import { Router } from "express";
import * as authorService from "./author.service.js";



const router=Router()

router.post("/create", authorService.createAuthor)





export default router