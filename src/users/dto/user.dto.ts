import { UserRole } from "../users.model";

export class UserDto {
  readonly email: string;
  readonly username: string;
  readonly role: UserRole;
  readonly profileId: number;
}
