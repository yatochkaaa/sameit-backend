import { Body, Controller, Post } from "@nestjs/common";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @Post()
  create(@Body() profileDto: CreateProfileDto) {
    return this.profileService.createProfile(profileDto);
  }
}
