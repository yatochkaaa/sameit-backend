import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileDto } from "./dto/profile.dto";
import { Profile } from "./profiles.model";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile) private profileRepository: typeof Profile
  ) {}

  async createProfile(dto: ProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.create(dto);
    return profile;
  }

  async getAllProfiles(): Promise<Profile[]> {
    const profiles = await this.profileRepository.findAll();
    return profiles;
  }

  async updateProfile(id: number, updatedProfile: ProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findByPk(id);

    if (!profile) {
      throw new HttpException("Профиль не найден.", HttpStatus.NOT_FOUND);
    }

    for (const key in updatedProfile) {
      profile[key] = updatedProfile[key];
    }

    profile.save();

    return profile;
  }

  async deleteProfile(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findByPk(id);

    if (!profile) {
      throw new HttpException("Профиль не найден", HttpStatus.NOT_FOUND);
    }

    await this.profileRepository.destroy({ where: { id } });

    return profile;
  }
}
