import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config";
import User from "./entities/user.entity";
import RoleUser from "./enum/role.enum";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    const adminUser = await userRepository.findOneBy({ username: "admin" });
    if (!adminUser) {
      const newUser = userRepository.create({
        username: "admin",
        password: "admin1234",
        role: RoleUser.ADMIN,
      });
      await userRepository.save(newUser);
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("error", error);
  }
};
startServer();
