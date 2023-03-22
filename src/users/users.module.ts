import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Profile } from "src/profiles/profiles.model";
import { ProfilesModule } from "src/profiles/profiles.module";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Profile]), ProfilesModule],
})
export class UsersModule {}
