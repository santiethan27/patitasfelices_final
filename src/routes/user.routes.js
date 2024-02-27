import { deletUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { authRequired } from './../middlewares/validateToken.js';
import { Router } from 'express';
import fileUpload from 'express-fileupload';

const router = Router();

const fileUp = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads/'
});

router.get('/profile', authRequired, getUser);
router.put('/update-user/:id', fileUp, updateUser);
router.delete('/user_delete/:id', deletUser)
router.get('/users', getUsers)

export default router;