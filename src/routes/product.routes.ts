import { Router } from "express";
import productController from "../controllers/product.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import AuthorMiddleware from "../middlewares/Author.middleware";

const router = Router();

router.get("", productController.getAll);
router.post("", AuthMiddleware, productController.create);
router.get("/:id", productController.get);
router.put("/:id", AuthMiddleware, AuthorMiddleware, productController.update);
router.delete(
  "/:id",
  AuthMiddleware,
  AuthorMiddleware,
  productController.delete
);

export default router;
