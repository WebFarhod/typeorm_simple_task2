import User from "../entities/user.entity";

export default interface IProduct {
  name: string;
  volume: number;
  user: User;
}
