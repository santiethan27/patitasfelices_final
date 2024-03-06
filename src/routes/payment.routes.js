import { Router } from "express";
import { postPayment } from "../controllers/payment.controller.js";


const router = Router();

router.post("/create_payment", postPayment);

export default router