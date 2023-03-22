import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProfileDto } from "src/profiles/dto/create-profile.dto";
import { ProfilesService } from "src/profiles/profiles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserRole } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private profileService: ProfilesService
  ) {}

  async createUser(dto: CreateUserDto & CreateProfileDto): Promise<User> {
    const profile = await this.profileService.createProfile({
      firstName: dto.firstName,
      lastName: dto.lastName,
      state: dto.state,
    });
    const user = await this.userRepository.create({
      email: dto.email,
      username: dto.username,
      role: dto.role,
      profileId: profile.id,
    });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    if (!role) {
      throw new HttpException("Неправильный запрос", HttpStatus.BAD_REQUEST);
    }

    if (role && !Object.values(UserRole).includes(role)) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }

    const users = await this.userRepository.findAll({ where: { role } });

    return users;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.destroy({ where: { id } });

    return user;
  }
}
