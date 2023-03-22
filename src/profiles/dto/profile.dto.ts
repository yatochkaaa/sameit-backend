import { State } from "../profiles.model";

export class ProfileDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly state: State;
}