import { Contains, IsString } from "class-validator";
import { State } from "../profiles.model";

export class ProfileDto {
  @IsString({ message: "Должно быть строкой" })
  readonly firstName: string;
  @IsString({ message: "Должно быть строкой" })
  readonly lastName: string;
  @Contains(State.Male || State.Female, { message: "Должно быть male или female" })
  readonly state: State;
}
