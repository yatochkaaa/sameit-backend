import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
} from "@nestjs/common";
import { CreateProfileDto } from "src/profiles/dto/create-profile.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "./users.model";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("registration")
  create(@Body() dto: CreateUserDto & CreateProfileDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  getByRole(@Query("role") role: UserRole) {
    return this.userService.getUsersByRole(role);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
