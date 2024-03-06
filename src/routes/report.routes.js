import { Router } from "express";
import { deleteReport, getReports, postReport } from "../controllers/report.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

const fileUp = fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads/",
});

router.post("/report", fileUp, postReport);
router.get("/reports", getReports);
router.delete("/report/:id", deleteReport);

export default router;
