import { Router } from "express";
import {
  deleteAdoption,
  getAdoption,
  getAdoptions,
  isAdopting,
  postAdoption,
  putAdoption,
} from "../controllers/adoption.controller.js";

const router = Router();

router.post("/adoption", postAdoption);
router.put("/adoption/:id", putAdoption);
router.delete("/adoption/:id", deleteAdoption);
router.get("/adoption/:id", getAdoption);
router.get("/adoptions", getAdoptions);
router.get("/adoption/verify/:id", isAdopting);

export default router;
