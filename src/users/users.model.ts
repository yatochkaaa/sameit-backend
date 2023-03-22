import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

interface UserCreationAttrs {
  email: string;
  username: string;
  role: UserRole;
  profileId: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    defaultValue: UserRole.User,
  })
  role: UserRole;

  @ForeignKey(() => Profile)
  @Column({ type: DataType.INTEGER })
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;
}
