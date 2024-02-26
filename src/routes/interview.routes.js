import { Router } from "express";
import { deleteInterview, getInterview, getInterviews, postInterview, putInterview } from "../controllers/interview.controller";

const router = Router();

router.post('/interview', postInterview);
router.put('/interview/:id', putInterview);
router.delete('/interview/:id', deleteInterview);
router.get('/interview/:id', getInterview);
router.get('/interviews', getInterviews);

export default router;