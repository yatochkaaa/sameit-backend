import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
} from "@nestjs/common";
import { ProfileDto } from "src/profiles/dto/profile.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "./users.model";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("registration")
  create(@Body() dto: CreateUserDto & ProfileDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  getByFilter(@Query() query) {
    return this.userService.getUsersByFilter(query);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
