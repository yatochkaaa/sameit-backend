import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserRole } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUsersByRole(role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
      throw new HttpException("Роли не найдены", HttpStatus.NOT_FOUND);
    }

    const users = await this.userRepository.findAll({ where: { role } });

    return users;
  }

  async deleteUser(id: number) {
    try {
      await this.userRepository.destroy({ where: { id } });
      return `Пользователь c id ${id} успешно удалён`;
    } catch (err) {
      throw new HttpException("Пользователь не найден.", HttpStatus.NOT_FOUND);
    }
  }
}
