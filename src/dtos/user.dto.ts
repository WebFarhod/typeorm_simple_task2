import User from "../entities/user.entity";
import RoleUser from "../enum/role.enum";

class UserJwtDto {
  id: string;
  username: string;
  role: RoleUser;

  constructor(payload: User) {
    this.id = payload.id;
    this.username = payload.username;
    this.role = payload.role;
  }

  data() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
    };
  }
}

export default UserJwtDto;
