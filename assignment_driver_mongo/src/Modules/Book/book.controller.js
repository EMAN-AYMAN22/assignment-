import { Router } from "express";
import * as bookService from "./book.service.js";


const router=Router()

router.post("/",bookService.createBookCollection)
router.post("/index",bookService.createIndexTitle)
router.post("/patch",bookService.createMultipleBooks)
router.patch("/:title",bookService.updateBooks)
router.get("/",bookService.getBookByTitle)
router.get("/years/",bookService.getBookByYears)
router.get("/genre",bookService.getBooksByGenre)
router.get("/skip-limit",bookService.getBooksLimit)
router.get("/year-integer",bookService.getBooksByYearInteger)
router.get("/exclude-genres",bookService.getBooksByExcludeGenres)
router.delete("/before-year",bookService.deleteBooksBeforeYear)
router.get("/aggregate1",bookService.aggregate1)
router.get("/aggregate2",bookService.aggregate2)
router.get("/aggregate3",bookService.aggregate3)
// router.get("/aggregate4",bookService.aggregate4)
export default router
