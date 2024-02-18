import { Router } from "express";
import fileUpload from "express-fileupload";
import { 
    deleteProduct,
    editProduct,
    getProduct,
    postProduct,
} from "../controllers/product.controller";

const router = Router();
const fileUp = fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/",
});

router.post("/product", fileUp,postProduct);
router.get("/products", getProduct);
router.get("/product/:id", getProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product", editProduct)
export default router;