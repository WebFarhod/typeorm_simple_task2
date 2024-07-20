import { NextFunction, Request, Response } from "express";
import productService from "../services/product.service";
import IProduct from "../types/product.type";

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const product = await productService.all();
    res.status(200).json(product);
  }
  async get(req: Request, res: Response, next: NextFunction) {
    const product = await productService.findById(req.params.id);
    res.status(200).json(product);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: IProduct = {
        ...req.body,
        user: req.user.id,
      };
      const product = await productService.create({
        ...payload,
        user: payload.user,
      });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product) {
        product.user = product.user.id as any;
      }
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    await productService.delete(req.params.id);
    res.status(200).json({ message: "deleted product" });
  }
}

export default new ProductController();
