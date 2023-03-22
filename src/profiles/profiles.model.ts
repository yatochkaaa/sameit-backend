import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

export enum State {
  Male = "male",
  Female = "female",
}

interface ProfileCreationAttrs {
  firstName: string;
  lastName: string;
  state: State;
}

@Table({ tableName: "profiles" })
export class Profile extends Model<Profile, ProfileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: State;

  @HasOne(() => User)
  user: User;
}
