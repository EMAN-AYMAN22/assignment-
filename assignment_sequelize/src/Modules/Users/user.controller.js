import {Router} from 'express';
import * as userService from './user.service.js';

const router = Router();

router.post("/signup", userService.signup);
router.put("/:id", userService.updateUser);
router.get("/byemail", userService.getUserByEmail);
router.get("/:id", userService.getUserById);

export default router
