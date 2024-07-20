import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import User from "../entities/user.entity";
import authService from "../services/auth.service";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid parametrs",
      });
    }
    try {
      await authService.register(username, password);
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid parametrs",
      });
    }
    try {
      const data = await authService.login(username, password);
      res.cookie("refresh_token", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    // try {
      // const { refresh_token } = req.cookies;
      res.clearCookie('refresh_token')
      // const token = await authService.logout(refresh_token);
      // res.clearCookie("refresh_token");
      return res.json("logout")
    // } catch (error) {
    //   next(error)
    // }
  }
}
export default new AuthController();