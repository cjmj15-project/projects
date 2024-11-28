import express from "express";
const router = express.Router();
import productController from "../controller/product-controller.js";

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
