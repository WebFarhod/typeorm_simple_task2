import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import User from "./user.entity";

@Entity()
class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  volume: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}

export default Product;
