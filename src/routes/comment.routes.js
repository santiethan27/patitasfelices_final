import { Router } from 'express';
import { postComment } from './../controllers/comments.controller.js';

const router = Router();

router.post('/comment', postComment);

export default router;