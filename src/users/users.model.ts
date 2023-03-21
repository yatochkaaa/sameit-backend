import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

interface UserCreationAttrs {
  email: string;
  username: string;
  role: UserRole;
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
}
