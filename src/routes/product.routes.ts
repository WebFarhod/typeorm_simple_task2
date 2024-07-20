import express from "express";
import productController from "../controllers/product.controller";
const router = express.Router();

router.get("", productController.getAll);
router.post("", productController.create);
router.get("/:id", productController.get);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

export default router;
