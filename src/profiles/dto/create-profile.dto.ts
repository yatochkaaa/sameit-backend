import { State } from "../profiles.model";

export class CreateProfileDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly state: State;
  readonly userId: number;
}