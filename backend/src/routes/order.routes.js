import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  deleteOrderById,
  getOrderById,
  getOrders,
  postOrder,
  updateOrderById,
} from "./../controllers/order.controller.js";

const fileUp = fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/",
});

const router = Router();

router.post("/order", fileUp, postOrder);
router.get("/orders", getOrders);
router.get("/orderid/:id", getOrderById);
router.patch("/order/:id", updateOrderById);
router.delete("/order/:id", deleteOrderById);
export default router;
