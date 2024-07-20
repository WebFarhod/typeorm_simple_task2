import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import productService from "../services/product.service";

const AuthorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.findById(req.params.id);
    const authorId = req.user.id;
    console.log(authorId);
    console.log(product?.user.id);
    if (product?.user.id !== authorId) {
      return next(BaseError.BadRequest("Only author can edit this post"));
    }
    next();
  } catch (error) {
    return next(BaseError.BadRequest("Only author can edit this post"));
  }
};
export default AuthorMiddleware;
