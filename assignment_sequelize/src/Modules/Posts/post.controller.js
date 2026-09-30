import {Router} from 'express';
import * as postService from './post.service.js';

const router = Router();

 router.post('/', postService.createPost);
 router.delete("/delete/:id", postService.deletePost);
 router.get('/details', postService.getPostsDetails);
 router.get('/comment-count', postService.getAllPosts);

export default router
