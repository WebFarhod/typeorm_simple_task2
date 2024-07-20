import RoleUser from "../enum/role.enum";

export default interface IJwtUser {
  id: string;
  username: string;
  role:RoleUser
}
