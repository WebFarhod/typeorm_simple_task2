import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import jwt from "../utils/jwt";
import authService from "../services/auth.service";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return next(BaseError.UnauthorizedError());
    }
    const accressToken = auth.split(" ")[1];
    if (!accressToken) {
      return next(BaseError.UnauthorizedError());
    }
    const userData = jwt.validateAccessToken(accressToken);
    if (!userData) {
      return next(BaseError.UnauthorizedError());
    }
    const user = await authService.findById(userData?.id);
    if (!user) {
      return next(BaseError.UnauthorizedError());
    }
    req.user = user;
    next();
  } catch (error) {
    return next(BaseError.UnauthorizedError());
  }
};
export default AuthMiddleware;
