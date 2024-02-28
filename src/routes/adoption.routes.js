import { Router } from "express";
import { deleteAdoption, getAdoption, getAdoptions, postAdoption, putAdoption } from "../controllers/adoption.controller";

const router = Router();

router.post('/adoption', postAdoption);
router.put('/adoption/:id', putAdoption);
router.delete('/adoption/:id', deleteAdoption);
router.get('/adoption/:id', getAdoption);
router.get('/adoptions', getAdoptions);

export default router;