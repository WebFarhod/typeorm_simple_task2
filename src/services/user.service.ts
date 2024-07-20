import { DeepPartial } from "typeorm";
import User from "../entities/user.entity";
import { AppDataSource } from "../config";

class UserService {
  private readonly userRepository = AppDataSource.getRepository(User);

 
  async create(payload: DeepPartial<User>): Promise<User> {
    const create = this.userRepository.create(payload);
    return this.userRepository.save(create);
  }

  async findByUsername(username: User["username"]): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }
}

export default new UserService();
