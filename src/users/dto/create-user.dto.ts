import { UserRole } from "../users.model";

export class CreateUserDto {
  readonly email: string;
  readonly username: string;
  readonly role: UserRole;
}
