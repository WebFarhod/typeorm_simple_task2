import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";

@Entity()
class Product extends BaseEntity {
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  volume: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}

export default Product;
