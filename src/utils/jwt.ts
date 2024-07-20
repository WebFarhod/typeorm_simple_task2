import jwt from "jsonwebtoken";
import IJwtUser from "../types/user";

class Jwt {
  private accessKey: string;
  private refreshKey: string;

  constructor() {
    this.accessKey = process.env.JWT_ACCESS_KEY || "";
    this.refreshKey = process.env.JWT_REFRESH_KEY || "";

    if (!this.accessKey || !this.refreshKey) {
      throw new Error("JWT keys are not defined in environment variables");
    }
  }

  sign(payload: IJwtUser) {
    console.log("====================================");
    console.log(payload);
    console.log("====================================");
    try {
      const accessToken = jwt.sign(payload, this.accessKey, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(payload, this.refreshKey, {
        expiresIn: "7d",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }
}

export default new Jwt();
