import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import BaseEntity from "./base.entity";
import RoleUser from "../enum/role.enum";
import Product from "./product.entity";
import bcrypt from "bcrypt";

@Entity()
class User extends BaseEntity {
  @Index("username_index")
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: RoleUser,
    default: RoleUser.USER,
  })
  role: RoleUser;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default User;
