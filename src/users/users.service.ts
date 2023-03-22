import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileDto } from "src/profiles/dto/profile.dto";
import { ProfilesService } from "src/profiles/profiles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserRole } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private profileService: ProfilesService
  ) {}

  async createUser(dto: CreateUserDto & ProfileDto): Promise<User> {
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

  async getUsersByFilter(query): Promise<User[]> {
    if (Object.keys(query).length === 0) {
      throw new HttpException("Неправильный запрос", HttpStatus.BAD_REQUEST);
    }

    const users = await this.userRepository.findAll({ where: { ...query } });

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
