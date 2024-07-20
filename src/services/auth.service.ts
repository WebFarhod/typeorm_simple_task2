import { AppDataSource } from "../utils/config";
import UserJwtDto from "../dtos/user.dto";
import User from "../entities/user.entity";
import BaseError from "../errors/base.error";
import Jwt from "../utils/jwt";

class AuthService {
  private readonly userRepository = AppDataSource.getRepository(User);

  async register(username: string, password: string) {
    const exitUser = await this.userRepository.findOneBy({ username });
    if (exitUser) {
      throw BaseError.BadRequest(
        `The user is already registered with this username ${username}`
      );
    }
    const create = this.userRepository.create({ username, password });
    return this.userRepository.save(create);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });
    const isMatched = await User.comparePasswords(
      password,
      user?.password ?? ""
    );
    if (!user || !isMatched) {
      throw BaseError.BadRequest("Invalid email or password");
    }
    const userDto = new UserJwtDto(user);
    const token = Jwt.sign(userDto.data());
    return { userDto, ...token };
  }
  async findById(id: User["id"]): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
export default new AuthService();
