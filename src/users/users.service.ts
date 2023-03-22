import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileDto } from "src/profiles/dto/profile.dto";
import { ProfilesService } from "src/profiles/profiles.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private profileService: ProfilesService
  ) {}

  async createUser(dto: UserDto & ProfileDto): Promise<UserDto & ProfileDto> {
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

    return { ...user.dataValues, ...profile.dataValues };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUsersByFilter(query: UserDto): Promise<User[]> {
    if (Object.keys(query).length === 0) {
      throw new HttpException("Неправильный запрос", HttpStatus.BAD_REQUEST);
    }

    const users = await this.userRepository.findAll({
      where: { ...query },
      include: { all: true },
    });

    return users;
  }

  async updateUser(
    id: number,
    updatedUser: UserDto & ProfileDto
  ): Promise<UserDto & ProfileDto> {
    const user = await this.userRepository.findByPk(id);
    const profile = await this.profileService.getProfile(user.profileId);

    if (!user) {
      throw new HttpException("Пользователь не найден.", HttpStatus.NOT_FOUND);
    }

    for (const key in updatedUser) {
      if (user.dataValues.hasOwnProperty(key)) {
        user[key] = updatedUser[key];
      } else if (profile.dataValues.hasOwnProperty(key)) {
        profile[key] = updatedUser[key];
      } else {
        throw new HttpException("Неправильный запрос", HttpStatus.BAD_REQUEST);
      }
    }

    user.save();
    profile.save();

    return { ...user.dataValues, ...profile.dataValues };
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.destroy({ where: { id } });
    await this.profileService.deleteProfile(user.id);

    return user;
  }
}
