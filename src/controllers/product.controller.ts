import { NextFunction, Request, Response } from "express";

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {}
  async get(req: Request, res: Response, next: NextFunction) {}
  async create(req: Request, res: Response, next: NextFunction) {}
  async update(req: Request, res: Response, next: NextFunction) {}
  async delete(req: Request, res: Response, next: NextFunction) {}
}

export default new ProductController();
