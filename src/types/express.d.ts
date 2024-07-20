import { IJwtUser } from "../types/user";
declare global {
  namespace Express {
    interface Request {
      user?: IJwtUser;
    }
  }
}
