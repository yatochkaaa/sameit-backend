import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Put,
} from "@nestjs/common";
import { ProfileDto } from "src/profiles/dto/profile.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("registration")
  create(@Body() dto: UserDto & ProfileDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  getByFilter(@Query() query: UserDto) {
    return this.userService.getUsersByFilter(query);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updatedUser: UserDto & ProfileDto
  ) {
    return this.userService.updateUser(id, updatedUser);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
