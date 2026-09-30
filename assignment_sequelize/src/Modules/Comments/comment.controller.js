import {Router} from 'express';
import * as commentService from './comment.service.js';

const router = Router();

router.post('/create', commentService.createComment);
router.post('/comments', commentService.createMultipleComments);
router.patch("/:commentId", commentService.updateComment);
router.post("/find-or-create", commentService.findOrCreateComment);
router.get("/", commentService.getCommentsByKeyword);
router.get("/newest/:postId", commentService.getNewestComments);
router.get("/details/:id", commentService.getCommentById);


export default router
