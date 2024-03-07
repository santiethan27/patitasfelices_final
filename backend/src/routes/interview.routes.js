import { Router } from "express";
import { deleteInterview, getInterviewAdoption, getInterviewUser, postInterview, putInterview } from "../controllers/interview.controller.js";

const router = Router();

router.post('/interview', postInterview);
router.put('/interview/:id', putInterview);
router.delete('/interview/:id', deleteInterview);
router.get('/interview/user/:id', getInterviewUser);
router.get('/interview/adoption/:id', getInterviewAdoption);

export default router;