import { Router } from "express";
import { postAdoption } from "../controllers/adoption.controller";

const router = Router();

router.post('/adoption', postAdoption);
router.put('/adoption:id', login);
router.delete('/adoption:id', logout);
router.get('/adoption:id', verify);
router.get('/adoptions', verify);

export default router;