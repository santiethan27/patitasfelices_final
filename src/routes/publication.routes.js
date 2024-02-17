import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  deletePublication,
  editPublication,
  getPublication,
  getPublications,
  postPublication,
} from "./../controllers/publication.controller.js";

const router = Router();

const fileUp = fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads/",
});

router.post("/publication", fileUp, postPublication);
router.get("/publications", getPublications);
router.get("/publication/:id", getPublication);
router.delete("/publication/:id", deletePublication);
router.put("/publication", editPublication);
export default router;
