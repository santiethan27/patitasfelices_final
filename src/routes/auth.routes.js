import {Router} from 'express';
import {login, register, logout, profile } from './../controllers/auth.controller.js';
import { authRequired } from './../middlewares/validateToken.js';
import { validateShema } from './../middlewares/validator.middleware.js';
import { registerShema, loginShema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateShema(registerShema), register);
router.post('/login',validateShema(loginShema), login);
router.post('/logout', logout);
router.get('/profile', authRequired , profile)

export default router