import { Router } from "express";
import { getReports, postReport } from "../controllers/report.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

const fileUp = fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads/",
});

router.post("/report", fileUp, postReport);
router.get("/reports", getReports);

export default router;
