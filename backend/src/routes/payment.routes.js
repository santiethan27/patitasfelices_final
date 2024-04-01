import { Router } from "express";
import { postPayment, receiveWebhook } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create_payment", postPayment);
router.post("/webhook", receiveWebhook);

export default router;
