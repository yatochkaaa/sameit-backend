import { Body, Controller, Post, Get, Delete, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('registration')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  getByRole(@Query('role') role: UserRole) {
    return this.userService.getUsersByRole(role);
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
