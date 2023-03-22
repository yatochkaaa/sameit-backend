import { Contains, IsEmail, IsNumber, IsString } from "class-validator";
import { UserRole } from "../users.model";

export class UserDto {
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @IsString({ message: "Должно быть строкой" })
  readonly username: string;
  @Contains(UserRole.Admin || UserRole.User, { message: "Должно быть admin или user" })
  readonly role: UserRole;
  @IsNumber({}, { message: "Должно быть числом" })
  readonly profileId: number;
}
