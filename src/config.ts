import { DataSource } from "typeorm";
import User from "./entities/user.entity";
import Product from "./entities/product.entity";
import "dotenv/config";
const port = process.env.DB_PORT as number | undefined;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Product],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
