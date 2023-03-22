import { Body, Controller, Get, Param, Put, Request } from "@nestjs/common";
import { ProfileDto } from "./dto/profile.dto";
import { Profile } from "./profiles.model";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @Get()
  getAll() {
    return this.profileService.getAllProfiles();
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() updatedProfile: ProfileDto): Promise<Profile> {
    return this.profileService.updateProfile(id, updatedProfile);
  }
}
